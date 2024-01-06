import "./amiibo-card.js";
import { writeFavAmiiboData, removeFavAmiiboData } from "./firebase.js";
import * as firebase from "./firebase.js";
import * as storage from "./localStorage.js";



// ----- Local Storage of User Inputs for UI State Preservation -----

const input = document.querySelector("#input");
const limit = document.querySelector("#field-limit");
const user = "jjp1723-";
const inputKey = user + "input";
const limitKey = user + "limit";

const storedInput = localStorage.getItem(inputKey);
const storedLimit = localStorage.getItem(limitKey);

if(storedInput)
{
    input.value = storedInput;
}
else
{
    input.value = "Mario";
}

if(storedLimit)
{
    limit.querySelector(`option[value='${storedLimit}']`).selected = true;
}

input.onchange = e => { localStorage.setItem(inputKey, e.target.value); };
limit.onchange = e => { localStorage.setItem(limitKey, e.target.value); };


// Initializing the first part of the api searching url and the number of results to be dsiplayed
const url = "https://amiiboapi.com/api/amiibo";
let inputURL = "";
let count = 0;

// Creating a reference to the 'search' button and assigning an onclick event to it
const searchButton = document.querySelector("#btn-search");
searchButton.onclick = loadJsonfetch;

// Creating a reference to the 'clear' button and assigning an onclick event to it
const clearButton = document.querySelector("#btn-clear-all")
clearButton.onclick = () => {
    clearButton.className = "button is-warning is-medium is-loading";
    document.querySelector("#element-card-holder").innerHTML = "";
    document.querySelector("#element-status").innerHTML = `Click the <b>Search</b> button to view amiibos`;
    clearButton.className = "button is-warning is-medium";
}

// loadJsonfetch Function - Fetch's api data based on user input
function loadJsonfetch()
{
    // Turning the user's input into a usable url
    inputURL = input.value;
    let searchURL = url +"/?name=" + inputURL;

    const fetchPromise = async () => {
        //
        searchButton.className = "button is-primary is-medium is-loading";
        // await ("stay on lis line") until the first promise is resolved
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

        // await ("stay on this line") until the second promise is resolved
        let json = await response.json();

        // Ensuring the amount of amiibos to be displayed doesn't exceed the actual amount that exist
        count = parseInt(limit.value);
        if(count > json.amiibo.length)
        {
            count = json.amiibo.length;
        }
        document.querySelector("#element-status").innerHTML = `Loading <b>${count}</b> amiibos.`;

        // Clearing the 'element-card-holder' html in case anything was laready displayed
        document.querySelector("#element-card-holder").innerHTML = "";
        for(let index = 0; index < count; index++)
        {
            const a = json.amiibo[index];
            showAmiibo(a);
        }

        document.querySelector("#element-status").innerHTML = `Displaying <b>${count}</b> amiibos of <b>${inputURL}</b>.`;
    
        searchButton.className = "button is-primary is-medium";
    };
    
    fetchPromise()
        .catch(e => {
            console.log(`In catch with e = ${e}`);
        });
}

const showAmiibo = amiiboObj => {
    const amiiboCard = document.createElement("amiibo-card");
    amiiboCard.dataset.name = amiiboObj.name ?? "no name found";
    amiiboCard.dataset.gameSeries = amiiboObj.gameSeries ?? "?";
    amiiboCard.dataset.amiiboSeries = amiiboObj.amiiboSeries ?? "?";
    amiiboCard.dataset.image = amiiboObj.image ?? "";
    amiiboCard.dataset.model = amiiboObj.head + amiiboObj.tail;
    amiiboCard.dataset.favorited = checkFavorited(amiiboObj);

    if(!amiiboCard.dataset.favorited || amiiboCard.dataset.favorited === "false")
    {
        amiiboCard.callback = addToFavorites; // change the card's callback to point at `addToFavorites()`
    }
    else
    {
        amiiboCard.callback = removeFromFavorites; // change the card's callback to point at `removeFromFavorites()`
    }

    document.querySelector("#element-card-holder").appendChild(amiiboCard);
    console.log(amiiboCard.callback);
}

const checkFavorited = amiiboObj => {
    const model = amiiboObj.head + amiiboObj.tail;
    const favorites = storage.getFavorites();

    if(favorites.length > 0)
    {
        for(let index = 0; index < favorites.length; index++)
        {
            const amiibo = favorites[index];
            if(amiibo.model == model)
            {
                return true;
            }
        }
    }

    return false;
}

const addToFavorites = amiiboObj => {
    if(amiiboObj)
    {
        storage.addFavorite(amiiboObj);
        writeFavAmiiboData(amiiboObj);
    }
};

const removeFromFavorites = amiiboObj => {
    if(amiiboObj)
    {
        storage.removeFavorite(amiiboObj);
        removeFavAmiiboData(amiiboObj);
    }
};

loadJsonfetch();