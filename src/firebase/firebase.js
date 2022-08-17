// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfXRMXUigL_83-sTRThSP1FnkecD9lla4",
  authDomain: "project-watiti.firebaseapp.com",
  projectId: "project-watiti",
  storageBucket: "project-watiti.appspot.com",
  messagingSenderId: "487704313096",
  appId: "1:487704313096:web:523376a9b0e3dbf24500bd",
  measurementId: "G-T262RJWR5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export default app