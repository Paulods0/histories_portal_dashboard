import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAFwO9opVpJWpGGwRp2WO9gEAd_GMIQFEE",
  authDomain: "history-post.firebaseapp.com",
  projectId: "history-post",
  storageBucket: "history-post.appspot.com",
  messagingSenderId: "352535464331",
  appId: "1:352535464331:web:31abae39f6ab66cf58c78e",
  measurementId: "G-M1CKNQ72L6",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
