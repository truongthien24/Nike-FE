// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBB9krZC6Sb_AsCJD_J90li3kTncEVvXPQ",
    authDomain: "thuesach-301fd.firebaseapp.com",
    projectId: "thuesach-301fd",
    storageBucket: "thuesach-301fd.appspot.com",
    messagingSenderId: "313046722447",
    appId: "1:313046722447:web:c7ca7b88cd448da9210dfa",
    measurementId: "G-HW4JYK5ZT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth, app };