// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBZHZCTF0rqAevJxPirMFN5ExogexbPkLY',
  authDomain: 'react-cursos-41300.firebaseapp.com',
  projectId: 'react-cursos-41300',
  storageBucket: 'react-cursos-41300.appspot.com',
  messagingSenderId: '893899329378',
  appId: '1:893899329378:web:99a8a1f3df9a39110ba63b'
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)
