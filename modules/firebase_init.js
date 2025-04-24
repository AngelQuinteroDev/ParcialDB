// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOZrTYvp3_ZYPumRdWx46T3dZP0csJ7aE",
  authDomain: "unisphere-6723f.firebaseapp.com",
  projectId: "unisphere-6723f",
  storageBucket: "unisphere-6723f.firebasestorage.app",
  messagingSenderId: "432246524256",
  appId: "1:432246524256:web:062d0c3f9ac73e37917605"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };