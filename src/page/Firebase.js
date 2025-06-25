// src/page/Firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4wbOEoVrN3DOd4THsCJDGB4HDBJE3ZWk",
  authDomain: "assigment-11-21e00.firebaseapp.com",
  projectId: "assigment-11-21e00",
  storageBucket: "assigment-11-21e00.firebasestorage.app",
  messagingSenderId: "606672042383",
  appId: "1:606672042383:web:8618051099f8d6f2cf33fa",
  measurementId: "G-60T5NJ5FCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// ✅ Export all needed modules
export { app, analytics, db };
