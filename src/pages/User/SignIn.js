import React, { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, provider } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          role: "author",
          salary: 1000
        });
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((e) => {
        console.log("🚀 ~ file: SignIn.js ~ line 37 ~ signInWithEmail ~ e", e.code);
        setShowAlert(true);
        "auth/invalid-email" === e.code && setAlertMessage("Invalid credentials. Try again");
      });
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-20">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="**********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={signInWithEmail}>
            Sign In
          </button>
        </div>
        <div className="flex rounded-lg border-2 justify-center items-center mt-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
            alt="logo"
            className="w-6 h-6"
          />
          <button className="py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={signInWithGoogle}>
            Sign In with Google
          </button>
        </div>
        <div className="flex items-baseline space-x-4">
          <p className="mt-4">Don't have an account?</p>
          <a href="/signUp" className="text-blue-500 underline">
            Sign up
          </a>
        </div>
      </form>
      {showAlert && (
        <div className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          <svg className="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"></path>
          </svg>
          <div>
            <span className="font-medium">{alertMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
