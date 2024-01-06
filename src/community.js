import "./amiibo-card.js";
import * as storage from "./localStorage.js";
import { writeFavAmiiboData, removeFavAmiiboData } from "./firebase.js";
import { getDatabase, ref, set, push, onValue, increment, get, update } from  "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

// Creating a reference to the 'community favorites' div
const favoritesList = document.querySelector("#community-favorites");

// Initializing the first part of the api searching url
const url = "https://amiiboapi.com/api/amiibo";

// favoritsChanges Function - Updates the contents of 'favoritesList' whenever a a change occurs
const favoritesChanged = (snapshot) => {
    // Communicating the page state to the user
    document.querySelector("#element-status").innerHTML = "Loading Community Favorites Data"

    // Clearing 'favoritesList'
    favoritesList.innerHTML = "";

    // Loading all entries from the amiibo-finder database and displaying them to the user
    snapshot.forEach(fav => {
        const childKey = fav.key;
        const childData = fav.val();
        console.log(childKey,childData);

        // Turning the model id's retrieved from the database into a usable url
        let searchURL = url +"/?id=" + childKey;

        const fetchPromise = async () => {
            let response = await fetch(searchURL);

            if(!response.ok)
            {
                if(response.status == 404)
                {
                    // Update UI and bail out
                    console.log("404 not found");
                    document.querySelector("#element-status").innerHTML = `No amiibos exist of <b>${inputURL}</b>.  Check your spelling and <b>Search</b> again.`;
                    searchButton.className = "button is-primary is-medium";
                    return;
                }
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let json = await response.json();

            // Displaying amiibo-cards created from the api search results, but only if the amiibo model has a positive amount of community likes
            const a = json.amiibo;
            if(childData.likes > 0)
            {
                showAmiibo(a);
            }
        };

        fetchPromise();

        // Displaying the amount of likes each amiibo has to the user
        favoritesList.innerHTML += `<li><b>${childData.name}</b> - Likes: ${childData.likes}</li>`;

        // To-Do: Have the amount of likes displayed on the amiibo cards
    });

    // Communicating the page state to the user
    document.querySelector("#element-status").innerHTML = "Community Favorites Data: "
};

// showFavorites Function - Display the community favorites to the user
const showFavorites = () => {
    // Grab the array of favorites from localStorage
    const favorites = storage.getFavorites();

    // If there are favorites, display them
    if(favorites.length > 0)
    {
        // Communicating the page state to the user
        document.querySelector("#element-status").innerHTML = "Loading..."

        // Calling 'showAmiibo()' for each favorite
        for(let index = 0; index < favorites.length; index++)
        {
            const a = favorites[index];
            showAmiibo(a);
        }

        // Communicating the page state to the user
        document.querySelector("#element-status").innerHTML = "Displaying " + favorites.length + " favorite(s)"
    }

    // If there are no favorites, communicate that to the user
    else
    {
        // Communicating the page state to the user
        document.querySelector("#element-status").innerHTML = "No favorites yet"
    }
};

// showAmiibo Function - Creates an 'amiibo-card' web component and appends it to 'favoritesList'
const showAmiibo = amiiboObj => {
    // Creating an 'amiibo-card'
    const amiiboCard = document.createElement("amiibo-card");

    // Updating the 'amiibo-card' data
    amiiboCard.dataset.name = amiiboObj.name ?? "no name found";
    amiiboCard.dataset.gameSeries = amiiboObj.gameSeries ?? "?";
    amiiboCard.dataset.amiiboSeries = amiiboObj.amiiboSeries ?? "?";
    amiiboCard.dataset.image = amiiboObj.image ?? "";
    amiiboCard.dataset.model = amiiboObj.head + amiiboObj.tail;
    amiiboCard.dataset.favorited = checkFavorited(amiiboObj);

    // If the amiibo has not been favorited, its callback function is changed to point at `addToFavorites()`
    if(!amiiboCard.dataset.favorited || amiiboCard.dataset.favorited === "false")
    {
        amiiboCard.callback = addToFavorites;
    }

    // If the amiibo has not been favorited, its callback function is changed to point at `removeFromFavorites()`
    else
    {
        amiiboCard.callback = removeFromFavorites;
    }

    // Appending the 'amiibo-card' to 'favoritesList'
    favoritesList.appendChild(amiiboCard);
}

// checkFavorited Function - Checks if an amiibo has already been favorited in local storage
const checkFavorited = amiiboObj => {
    // Generating the amiibo's model id from its head and tail
    const model = amiiboObj.head + amiiboObj.tail;

    // A reference to the favorites stored in localStorage
    const favorites = storage.getFavorites();

    // If there are any favorites in local storage, loop through them and compare them to the 'amiiboObj'
    if(favorites.length > 0)
    {
        for(let index = 0; index < favorites.length; index++)
        {
            // If the model id's match, the amiibo has been favorited
            const amiibo = favorites[index];
            if(amiibo.model == model)
            {
                return true;
            }
        }
    }

    // Returns false by default
    return false;
}

// addToFavorites Function - Calls the 'addFavorite()' and 'writeFavAmiiboData()' functions to update local storage and firebase
const addToFavorites = amiiboObj => {
    if(amiiboObj)
    {
        storage.addFavorite(amiiboObj);
        writeFavAmiiboData(amiiboObj);
    }
};

// removeFromFavorites Function - Calls the 'removeFavorite()' and 'removeFavAmiiboData()' functions to update local storage and firebase
const removeFromFavorites = amiiboObj => {
    if(amiiboObj)
    {
        storage.removeFavorite(amiiboObj);
        removeFavAmiiboData(amiiboObj);
    }
};

const init = () => {
    const db = getDatabase();
    const favoritesRef = ref(db, 'favorites/');
    onValue(favoritesRef,favoritesChanged);

    // https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
    window.onstorage = () => {
        showFavorites();
    };
};

init();