// 必要な関数を import
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtTttsdcgajSLATm8jBKQD4DlUzBdOuKU",
  authDomain: "team7-original-app-c31e4.firebaseapp.com",
  projectId: "team7-original-app-c31e4",
  storageBucket: "team7-original-app-c31e4.appspot.com",
  messagingSenderId: "155146432896",
  appId: "1:155146432896:web:ec85ffdaa8f457ca869165",
  measurementId: "G-70EKF7ERJJ",
};

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig);
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app);
