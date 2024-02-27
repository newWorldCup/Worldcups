// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAfIrlfhVfYB01QzC5Q2KD1atBfkGVuxgE',
  authDomain: 'my-worldcup-dd45c.firebaseapp.com',
  projectId: 'my-worldcup-dd45c',
  storageBucket: 'my-worldcup-dd45c.appspot.com',
  messagingSenderId: '1008692414359',
  appId: '1:1008692414359:web:e4842c0565438458efe6d2'
  // measurementId: process.env.REACT_APP_FIREBARES_MEASUERMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
