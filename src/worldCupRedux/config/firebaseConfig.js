// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAfIrlfhVfYB01QzC5Q2KD1atBfkGVuxgE',
  authDomain: 'my-worldcup-dd45c.firebaseapp.com',
  projectId: 'my-worldcup-dd45c',
  storageBucket: 'my-worldcup-dd45c.appspot.com',
  messagingSenderId: '1008692414359',
  appId: '1:1008692414359:web:e4842c0565438458efe6d2'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
