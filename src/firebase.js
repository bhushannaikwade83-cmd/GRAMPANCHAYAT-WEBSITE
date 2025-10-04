// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1LQOQgSw_iYnyL2ti7PB_-kmsECmNhco",
  authDomain: "govt-gram-panchayat-project.firebaseapp.com",
  projectId: "govt-gram-panchayat-project",
  storageBucket: "govt-gram-panchayat-project.firebasestorage.app",
  messagingSenderId: "22205845601",
  appId: "1:22205845601:web:817b22295d5d8ca3dd1a20",
  measurementId: "G-6Q38QJMY4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
export default app;
