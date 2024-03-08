// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA35MJoCXnNTteKJYXksRWS7bzEozWSXCU",
  authDomain: "g17fronttest.firebaseapp.com",
  projectId: "g17fronttest",
  storageBucket: "g17fronttest.appspot.com",
  messagingSenderId: "64786884465",
  appId: "1:64786884465:web:fa548eba1d8fecc967f8d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
