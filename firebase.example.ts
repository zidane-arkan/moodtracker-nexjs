// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.process.NEXT_PUBLIC_API_KEY,
  authDomain: env.process.NEXT_PUBLIC_authDomain,
  projectId: env.process.NEXT_PUBLIC_projectId,
  storageBucket: env.process.NEXT_PUBLIC_storageBucket,
  messagingSenderId: env.process.NEXT_PUBLIC_messagingSenderId,
  appId: env.process.NEXT_PUBLIC_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
