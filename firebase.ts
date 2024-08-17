// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_1UBxJyiiDPgr5amEZGV12fpWROL-lrI",
  authDomain: "moodtracker-2f66f.firebaseapp.com",
  projectId: "moodtracker-2f66f",
  storageBucket: "moodtracker-2f66f.appspot.com",
  messagingSenderId: "909635545225",
  appId: "1:909635545225:web:7c1fcc1e71942535a93e58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
