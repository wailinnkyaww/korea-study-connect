// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTrGpTGmshUEwwnTIVDBI2qWTBJOkzH98",
  authDomain: "korea-study-connect.firebaseapp.com",
  projectId: "korea-study-connect",
  storageBucket: "korea-study-connect.firebasestorage.app",
  messagingSenderId: "127529170134",
  appId: "1:127529170134:web:8c480b0a543e8b8e720577",
  measurementId: "G-B0EKJ8BFQX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (safe to use in browser environments)
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

// Initialize and export Auth and Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
