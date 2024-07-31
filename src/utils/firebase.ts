// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD-3KtOl97VYepNISwsPTcjOJGcf6fEZt8",
  authDomain: "note-me-ebed3.firebaseapp.com",
  projectId: "note-me-ebed3",
  storageBucket: "note-me-ebed3.appspot.com",
  messagingSenderId: "214325063875",
  appId: "1:214325063875:web:c1d858f02cff05700bf276",
  databaseURL:
    "https://note-me-ebed3-default-rtdb.asia-southeast1.firebasedatabase.app/",
  measurementId: "G-H9QB326NKE",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(firebaseApp);

export { auth, googleProvider, database, ref, set, get, child };
