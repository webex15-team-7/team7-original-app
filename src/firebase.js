import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBtTttsdcgajSLATm8jBKQD4DlUzBdOuKU",
  authDomain: "team7-original-app-c31e4.firebaseapp.com",
  projectId: "team7-original-app-c31e4",
  storageBucket: "team7-original-app-c31e4.appspot.com",
  messagingSenderId: "155146432896",
  appId: "1:155146432896:web:ec85ffdaa8f457ca869165",
  measurementId: "G-70EKF7ERJJ",
}

const firebaseApp = initializeApp(firebaseConfig)

const projectAuth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
export { projectAuth, db }
