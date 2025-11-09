

// ✅ src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ REPLACE all fields below with your actual Firebase project values
const firebaseConfig = {
  apiKey: "AIzaSyDW3Eo2oin-f1hmUCpz-BeaeJZGr5741j0",
  authDomain: "employee-932c0.firebaseapp.com",
  projectId: "employee-932c0",
  storageBucket: "employee-932c0.firebasestorage.app",
  messagingSenderId: "978826550699",
  appId: "1:978826550699:web:8a122557764327d2a246ee",
  measurementId: "G-4V2PDB2BSD"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
