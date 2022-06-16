import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDGKHBb-mdYsoy3kRCtx8BvSsRtQdR4xkE",
  authDomain: "blog-site-55bb6.firebaseapp.com",
  projectId: "blog-site-55bb6",
  storageBucket: "blog-site-55bb6.appspot.com",
  messagingSenderId: "444087284703",
  appId: "1:444087284703:web:f28bce21ce9fb4a9114a6a",
  measurementId: "G-ZVWTWD8CEE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
