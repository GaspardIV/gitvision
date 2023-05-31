const firebaseConfig = {
  apiKey: "AIzaSyCyolhU2wNUPa4EuAUwd7OHoSkSna6VvP0",
  authDomain: "gitwizja.firebaseapp.com",
  projectId: "gitwizja",
  storageBucket: "gitwizja.appspot.com",
  messagingSenderId: "701504083594",
  appId: "1:701504083594:web:f31034453d3b700007ff73",
  measurementId: "G-GG9XJS5V40"
};

import { initializeApp, getApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";

export const firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase);
