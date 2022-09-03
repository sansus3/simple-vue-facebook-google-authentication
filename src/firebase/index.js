// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqdLez0UMRdF48XvDCjxpAWnQEBAmN1n4",
  authDomain: "webferrol-pruebas.firebaseapp.com",
  projectId: "webferrol-pruebas",
  storageBucket: "webferrol-pruebas.appspot.com",
  messagingSenderId: "625608619681",
  appId: "1:625608619681:web:51e6db7c4bc9f0023b62e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


