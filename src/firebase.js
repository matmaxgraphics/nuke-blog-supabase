// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-e1Ti84PJQVtE5e_Ax81zMveeTzYQqDE",
  authDomain: "nuke-blog.firebaseapp.com",
  projectId: "nuke-blog",
  storageBucket: "nuke-blog.appspot.com",
  messagingSenderId: "473148927228",
  appId: "1:473148927228:web:24be22202a5acca922fb79",
  measurementId: "G-7EL7JC0X5Y",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);

export default auth;
