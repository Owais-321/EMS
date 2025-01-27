// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlJp22lX0AESwObXd7XtJRaTBu5kYuWls",
  authDomain: "ems-57796.firebaseapp.com",
  projectId: "ems-57796",
  storageBucket: "ems-57796.firebasestorage.app",
  messagingSenderId: "67803706232",
  appId: "1:67803706232:web:42d71ac40ebd3ea450ce8d",
  measurementId: "G-NRZGB1E48M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);
const analytics = getAnalytics(app);