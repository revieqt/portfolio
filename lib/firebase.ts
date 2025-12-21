import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFVbbOAuSjr2Ot-XOYCTITQdalIY1iVJY",
  authDomain: "josh-opsima-portfolio.firebaseapp.com",
  projectId: "josh-opsima-portfolio",
  storageBucket: "josh-opsima-portfolio.firebasestorage.app",
  messagingSenderId: "148674270170",
  appId: "1:148674270170:web:2ad4dd1e46acf6d17666e3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Optional: anonymous auth
signInAnonymously(auth).catch(console.error);
