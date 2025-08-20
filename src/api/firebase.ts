import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVoSxk7vHkwsL8dECm0za9ar_fA7u7zm4",
  authDomain: "test-605ce.firebaseapp.com",
  projectId: "test-605ce",
  storageBucket: "test-605ce.appspot.com",
  messagingSenderId: "223402070971",
  appId: "1:223402070971:web:9e6b25d6bb888637d76a9e",
  measurementId: "G-7Q7L5G99HB",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
