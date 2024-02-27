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
  apiKey: 'AIzaSyBnfP4QroC_AlyW4JLgntjRg9Z-bYSMh3I',
  authDomain: 'myworldcup-4c446.firebaseapp.com',
  projectId: 'myworldcup-4c446',
  storageBucket: 'myworldcup-4c446.appspot.com',
  messagingSenderId: '948337795021',
  appId: '1:948337795021:web:e80bed11a2fbe851ea2e84',
  measurementId: 'G-59SJ6BGZJP'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
