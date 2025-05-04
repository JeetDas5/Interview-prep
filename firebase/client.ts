import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDY-FvDjXHXVvWfbKj6cwZUj7pKltulChk",
  authDomain: "interview-wise-5f54d.firebaseapp.com",
  projectId: "interview-wise-5f54d",
  storageBucket: "interview-wise-5f54d.firebasestorage.app",
  messagingSenderId: "233247892114",
  appId: "1:233247892114:web:0e52c59cb12dff13aafc4b",
  measurementId: "G-TTLG8HLF63",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
