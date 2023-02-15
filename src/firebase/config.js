
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAeeuLD-EImwitl7jvKi7UTY3kwxzKaHRQ",
  authDomain: "office-management-d728b.firebaseapp.com",
  projectId: "office-management-d728b",
  storageBucket: "office-management-d728b.appspot.com",
  messagingSenderId: "904929700740",
  appId: "1:904929700740:web:42542801ab087bc592cbd1"
};


initializeApp(firebaseConfig);



export const auth = getAuth()
export const database = getFirestore()