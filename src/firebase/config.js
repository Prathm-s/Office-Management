
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from '../../credentials';


initializeApp(firebaseConfig);



export const auth = getAuth()
export const database = getFirestore()