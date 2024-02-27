// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyARwQHF6clmAhw_8Ol3xizX7uwqmXdPyIs',
  authDomain: 'worldcup-cf725.firebaseapp.com',
  projectId: 'worldcup-cf725',
  storageBucket: 'worldcup-cf725.appspot.com',
  messagingSenderId: '608492994215',
  appId: '1:608492994215:web:1bfb0b32a893c3c6c2e582',
  measurementId: 'G-NG0DL3L32H'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
