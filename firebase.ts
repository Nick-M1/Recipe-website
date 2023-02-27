import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from "@firebase/storage";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_CONFIG_APIKEY!,
    authDomain: "recipe-website-dc035.firebaseapp.com",
    projectId: "recipe-website-dc035",
    storageBucket: process.env.FIREBASE_CONFIG_STORAGEBUCKET!,
    messagingSenderId: "459960136519",
    appId: "1:459960136519:web:1cf041e4e7b46b78239262"
};

// Initialize Firebase
const app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app, 'gs://recipe-website-dc035.appspot.com/');

export {db, storage}