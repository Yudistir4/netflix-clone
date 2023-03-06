// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-QApZnP9e5MqJSgbLoeoLoK2L5OHKv6c",
  authDomain: "netflix-clone-e5aa8.firebaseapp.com",
  projectId: "netflix-clone-e5aa8",
  storageBucket: "netflix-clone-e5aa8.appspot.com",
  messagingSenderId: "983416280230",
  appId: "1:983416280230:web:2f0690162aa74f1e125067",
  measurementId: "G-G54YLNS0QK",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();

export default app;
export {
  auth,
  //  db
};
