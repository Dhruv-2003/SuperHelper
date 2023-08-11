// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBX7DV17ZFbn3gm-K0NzbMso_WoQ_O3eg",
  authDomain: "superhelper-35d6f.firebaseapp.com",
  projectId: "superhelper-35d6f",
  storageBucket: "superhelper-35d6f.appspot.com",
  messagingSenderId: "385785899062",
  appId: "1:385785899062:web:97fb541c53c2cf89535097",
  measurementId: "G-DMBSDXJ79F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth };
