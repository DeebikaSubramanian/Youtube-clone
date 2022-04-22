
import { getAuth } from "firebase/auth";
import {initializeApp} from "firebase/app";
import 'firebase/compat/auth';
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO0H4pyx7D-XMMormGiH3_CQiSVpouj2Q",
  authDomain: "clone-b5ee8.firebaseapp.com",
  projectId: "clone-b5ee8",
  storageBucket: "clone-b5ee8.appspot.com",
  messagingSenderId: "898492579278",
  appId: "1:898492579278:web:e9a4010f7cedff2a6cbf9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { auth, app,storage,db };