// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC4oG5OeJBxcHS6ZN415KdZtQi0SBGdrsw",
  authDomain: "react-chat-app-1591e.firebaseapp.com",
  databaseURL: "https://react-chat-app-1591e-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-1591e",
  storageBucket: "react-chat-app-1591e.appspot.com",
  messagingSenderId: "692600293848",
  appId: "1:692600293848:web:a055f9d7686b2b232f8aad",
  measurementId: "G-3JJHNJTRRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };
