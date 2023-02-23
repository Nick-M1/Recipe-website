import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "process.env.FIREBASE_CONFIG_APIKEY!",
    authDomain: "recipe-website-dc035.firebaseapp.com",
    projectId: "recipe-website-dc035",
    storageBucket: "recipe-website-dc035.appspot.com",
    messagingSenderId: "459960136519",
    appId: "1:459960136519:web:1cf041e4e7b46b78239262"
};

// Initialize Firebase
const app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)

const db = getFirestore(app)

export {db}