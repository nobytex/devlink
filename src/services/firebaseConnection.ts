import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD_nIILUMW3jL451sB4DZ8YqfLQjqZjnGQ",
  authDomain: "devlinks-b88a3.firebaseapp.com",
  projectId: "devlinks-b88a3",
  storageBucket: "devlinks-b88a3.appspot.com",
  messagingSenderId: "1058792562383",
  appId: "1:1058792562383:web:e251581edfb96c072661ba"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db};