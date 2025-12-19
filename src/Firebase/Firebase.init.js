// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLVOlpCVhbhGPyvYQbc6-9gCX5fv1orJ4",
  authDomain: "movie-vault-522.firebaseapp.com",
  projectId: "movie-vault-522",
  storageBucket: "movie-vault-522.firebasestorage.app",
  messagingSenderId: "124245473290",
  appId: "1:124245473290:web:3a331af15a79ad3a6f87f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
