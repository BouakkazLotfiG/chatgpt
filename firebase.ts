// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA-DpdQHRUFUAfwgKHawOzckPXe_O8hCKk',
  authDomain: 'chatgpt-391318.firebaseapp.com',
  projectId: 'chatgpt-391318',
  storageBucket: 'chatgpt-391318.appspot.com',
  messagingSenderId: '378721198998',
  appId: '1:378721198998:web:513b03daaeca860c2833b7',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
