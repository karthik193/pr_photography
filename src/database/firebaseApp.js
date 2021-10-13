import * as firebase from "firebase/app";
import 'firebase/firestore' ; 
import 'firebase/auth' ; 



//Configuration values 
const firebaseConfig = {
  apiKey: "AIzaSyCeBb9u619wejcVA2Tsra1xXhRyUcDck1c",
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL:  process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: "1:355915457455:web:08c352f1c3f1cc86d8855a",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app ; 