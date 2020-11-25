// import only the required packages to build a smaller application
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import { firebaseConfig } from "./firebase_config"

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();