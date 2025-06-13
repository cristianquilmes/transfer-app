// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCU6BkPWPNiHFKh4itVkdAPAulgUsdpG0k",
  authDomain: "transfers-app-9c92c.firebaseapp.com",
  databaseURL: "https://transfers-app-9c92c-default-rtdb.firebaseio.com",
  projectId: "transfers-app-9c92c",
  storageBucket: "transfers-app-9c92c.appspot.com",
  messagingSenderId: "701224167269",
  appId: "1:701224167269:web:c7ee58b5a33c4a0300e38c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue };
