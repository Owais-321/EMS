import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);