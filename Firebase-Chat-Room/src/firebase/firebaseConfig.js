// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDGtS24RymdIzLm8fpemF2zDiEA4swbisw',
  authDomain: 'hs-chat-80552.firebaseapp.com',
  projectId: 'hs-chat-80552',
  storageBucket: 'hs-chat-80552.appspot.com',
  messagingSenderId: '612648948423',
  appId: '1:612648948423:web:b1d0072bee5171036c24e2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Yetkilendirmeyi aktif eder
export const auth = getAuth(app);

// google ile yetkilendirmenin kurulumu
export const provider = new GoogleAuthProvider();

// veritabanıyla aradaki bağlantıyı sağlar
export const db = getFirestore(app);
