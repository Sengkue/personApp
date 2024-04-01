// plugins/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5HuZyFMZ03egHNeIM4nEsvfCknddn0OI",
  authDomain: "sengkuevangallinone.firebaseapp.com",
  databaseURL: "https://sengkuevangallinone-default-rtdb.firebaseio.com",
  projectId: "sengkuevangallinone",
  storageBucket: "sengkuevangallinone.appspot.com",
  messagingSenderId: "453885743625",
  appId: "1:453885743625:web:624ac4469494aee43f5ed8",
  measurementId: "G-7KEWNTZEDM"
};


// Initialize the first Firebase app with a custom name 'app'
const app = initializeApp(firebaseConfig, 'app');
const auth = getAuth(app);
const storage = getStorage(app);


export { auth, storage, sendPasswordResetEmail };
