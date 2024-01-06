import "./amiibo-card.js";
import * as storage from "./localStorage.js";
import { removeFavAmiiboData } from "./firebase.js";

// Declaring a variable that will be used to reference the 'element-card-holder' div
let listFavorites = null;

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
    amiiboCard.dataset.button = "Un-Favorite";
    amiiboCard.dataset.model = amiiboObj.model;
    amiiboCard.dataset.favorited = amiiboObj.favorited;

     // Change the card's callback to point at `removeFromFavorites()`
    amiiboCard.callback = removeFromFavorites;

    // Appending the 'amiibo-card' to 'element-card-holder' div
    document.querySelector("#element-card-holder").appendChild(amiiboCard);
}

// removeFromFavorites Function - Calls the 'removeFavorite()' and 'removeFavAmiiboData()' functions to update local storage and firebase, and then updates the page's contents
const removeFromFavorites = amiiboObj => {
    if(amiiboObj)
    {
        storage.removeFavorite(amiiboObj);
        removeFavAmiiboData(amiiboObj);
    }
    document.querySelector("#element-card-holder").innerHTML = "";
    showFavorites();
};

const init = () => {
    listFavorites = document.querySelector("#element-card-holder");
    showFavorites();

    /* Event Handlers */
    const clearAllButton = document.querySelector("#btn-clear-favorites");
    clearAllButton.onclick = () => {
        clearAllButton.className = "button is-primary is-loading";
        document.querySelector("#element-card-holder").innerHTML = "";

        // Calling 'removeFavAmiiboData()' for each amiibo currently favorited
        const favorites = storage.getFavorites();
        if(favorites.length > 0)
        {
            // Calling 'showAmiibo()' for each favorite
            for(let index = 0; index < favorites.length; index++)
            {
                const a = favorites[index];
                removeFavAmiiboData(a);
            }
        }

        storage.clearFavorites();
        showFavorites();
        clearAllButton.className = "button is-primary";
    };

    // https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
    window.onstorage = () => {
        showFavorites();
    };
};

init();