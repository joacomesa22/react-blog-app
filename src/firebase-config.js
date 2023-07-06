import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBa9c-WWneeM1u3npfNw09OfvTjOuOAThI",
  authDomain: "react-blog-website-df6dd.firebaseapp.com",
  projectId: "react-blog-website-df6dd",
  storageBucket: "react-blog-website-df6dd.appspot.com",
  messagingSenderId: "935945161176",
  appId: "1:935945161176:web:5053606c38e77841c38aad",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
