// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCcrjwVEhwNuNTbiKcUdzP0Jwn0oLQ8DEI",
  authDomain: "learning-firebase-auth-aeac2.firebaseapp.com",
  projectId: "learning-firebase-auth-aeac2",
  storageBucket: "learning-firebase-auth-aeac2.appspot.com",
  messagingSenderId: "36192402662",
  appId: "1:36192402662:web:45059dd6abb06e555fcf27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);