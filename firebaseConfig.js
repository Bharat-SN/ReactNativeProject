import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBK2ZyPUEPoE4iBUe99M29HOLt5yb_jdCw",
  authDomain: "kelltonproject-21b16.firebaseapp.com",
  projectId: "kelltonproject-21b16",
  storageBucket: "kelltonproject-21b16.appspot.com",
  messagingSenderId: "361624450794",
  appId: "1:361624450794:web:449a1a8998b28917f8c993",
  measurementId: "G-QSFTPT1DDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);