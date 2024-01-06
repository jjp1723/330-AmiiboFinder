/* Checked by ESLint - https://eslint.org/demo */
const defaultData = {
  "appTitle": "Default App Title",
  "favorites": []
},

// ID based storage name
storeName = "jjp1723-p1-settings";

const readLocalStorage = () => {
  let allValues = null;

  try
  {
    allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
  }catch(err)
  {
    console.log(`Problem with JSON.parse() and ${storeName} !`);
    throw err;
  }

  return allValues;
};

const writeLocalStorage = (allValues) => {
  localStorage.setItem(storeName, JSON.stringify(allValues));
};

export const clearLocalStorage = () => writeLocalStorage(defaultData);

export const addFavorite = (str) => {
  const allValues = readLocalStorage();

  allValues.favorites.push(str);
  writeLocalStorage(allValues);
};

export const removeFavorite = (str) => {
  const allValues = readLocalStorage();

  allValues.favorites.splice(allValues.favorites.indexOf(str));
  writeLocalStorage(allValues);
};

export const getFavorites = () => readLocalStorage().favorites;

export const clearFavorites = () => {
  const allValues = readLocalStorage();

  allValues.favorites = [];
  writeLocalStorage(allValues);
};