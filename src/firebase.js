import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, increment, get, update } from  "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLkiyhOt0RWqPk5hRWUSydRKJ8sniXQyg",
  authDomain: "amiibo-finder.firebaseapp.com",
  projectId: "amiibo-finder",
  storageBucket: "amiibo-finder.appspot.com",
  messagingSenderId: "148112083354",
  appId: "1:148112083354:web:c72e721edcef8c90c8d223"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);

// Making sure firebase is loaded
console.log(app);



// writeFavAmiiboData Function - Writes all neccessary data about a favorited amiibo to the amiibo-finder database
const writeFavAmiiboData = amiiboObj => {
  // Generating the database reference for the current amiibo based on its model id
  const db = getDatabase();
  const favRef = ref(db, 'favorites/' + amiiboObj.model);

  // Checking if the amiibo is in the database
  get(favRef).then(snapshot => {
    let favorite;
    if (snapshot.exists())
    {
      // If it does exist, increment the number of likes
      favorite = snapshot.val();
      console.log("found - current values=",favorite);
      const likes = favorite.likes + 1;
      const newData = {
        name: amiiboObj.name,
        likes
      };

      // Updating the database
      const updates = {};
      updates['favorites/' + amiiboObj.model] = newData;
      update(ref(db), updates);
    }
    else
    {
      // If it does not exist, create an entry on the database
      console.log(`No favorite of key='${amiiboObj}' found`);
      console.log("favorite=",favorite);
      set(favRef, {
        name: amiiboObj.name,
        likes: 1
      });
    }
  }).catch((error) => {
    console.error(error);
  });
}

// removeFavAmiiboData Function - Writes all neccessary data about a un-favorited amiibo to the amiibo-finder database
const removeFavAmiiboData = amiiboObj => {
  // Generating the database reference for the current amiibo based on its model id
  const db = getDatabase();
  const favRef = ref(db, 'favorites/' + amiiboObj.model);

  // Checking if the amiibo is in the database
  get(favRef).then(snapshot => {
    let favorite;
    if (snapshot.exists())
    {
      // If it does exist, decrement the number of likes
      favorite = snapshot.val();
      console.log("found - current values=",favorite);
      let likes = favorite.likes - 1;

      // Ensure the number of likes isn't negative
      if(likes < 1)
      {
        likes = 0;
      }

      const newData = {
        name: amiiboObj.name,
        likes
      };

      // Updating the database
      const updates = {};
      updates['favorites/' + amiiboObj.model] = newData;
      update(ref(db), updates);
    }
    else
    {
      // If it does not exist, create an entry on the database
      console.log(`No favorite of key='${amiiboObj}' found`);
      console.log("favorite=",favorite);
      set(favRef, {
        name: amiiboObj.name,
        likes: 0
      });
    }
  }).catch((error) => {
    console.error(error);
  });
}

const init = () => {
  const db = getDatabase();
  const favoritesRef = ref(db, 'favorites/');
};

init();

export { writeFavAmiiboData, removeFavAmiiboData };