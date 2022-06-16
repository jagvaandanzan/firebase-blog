import React, { useState } from "react";
import { auth, db, provider } from "../../firebase.config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const createAccount = async (e, email, userName, password) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: userName,
        email: email,
        role: "author",
        salary: 1000
      });
      navigate("/");
    } catch (e) {
      console.log("🚀 ~ file: SignUp.js ~ line 26 ~ createAccount ~ e", e);
    }
  };

  const createWithGoogle = async () => {
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

  return (
    <div className="w-full max-w-sm mx-auto mt-20 bg-white shadow-md rounded">
      <div className="px-8 space-y-4">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p>Start spending more time on your projects and less time managing your infrastructure.</p>
      </div>
      <form className=" rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
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
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repassword">
            Confirm password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reassword"
            type="password"
            placeholder="**********"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded focus:outline-none focus:shadow-outline"
          onClick={(e) => createAccount(e, email, userName, password)}>
          Sign Up
        </button>
        <div className="flex rounded-lg border-2 justify-center items-center mt-4 hover:border-blue-500">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
            alt="logo"
            className="w-6 h-6"
          />
          <button className="py-2 px-4 rounded  focus:outline-none focus:shadow-outline " type="button" onClick={createWithGoogle}>
            Sign Up with Google
          </button>
        </div>
        <div className="flex items-baseline space-x-4">
          <p className="mt-4">Already have an account?</p>
          <a href="/signIn" className="text-blue-500 underline">
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
}
