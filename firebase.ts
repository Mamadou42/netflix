// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt_861LOYKmJ6gxIvLhTKtg7-0cF-M6KI",
  authDomain: "netflix-eace2.firebaseapp.com",
  projectId: "netflix-eace2",
  storageBucket: "netflix-eace2.appspot.com",
  messagingSenderId: "601745606281",
  appId: "1:601745606281:web:5d283e079e16dd5ae12858"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app;
export { auth, db }