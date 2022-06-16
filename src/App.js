import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { auth, db } from "./firebase.config";
import Navbar from "./components/User/Navbar";
import Home from "./pages/User/Home";
import SignIn from "./pages/User/SignIn";
import SignUp from "./pages/User/SignUp";
import AddTutorials from "./pages/User/AddTutorials";
import { getUser } from "./utils/getUser";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import AdminHome from "./pages/Admin/AdminHome";
import AdminNavbar from "./components/Admin/AdminNavbar";
import NewPosts from "./components/Admin/NewPosts";
import Authors from "./pages/Admin/Authors";
import NotFound from "./pages/Error/NotFound";
import Post from "./pages/Admin/Post";
import ShowPost from "./pages/User/ShowPost";
import MyTutorials from "./pages/User/MyTutorials";

export const loggedInState = atom({
  key: "loggedIn",
  default: false
});

export const currentUserState = atom({
  key: "currentUser",
  default: {}
});

function App() {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user != null) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const res = await getDocs(q);
        res.docs.map((doc) => setCurrentUser({ ...doc.data(), docId: doc.id }));
        setLoggedIn(true);
      } else setLoggedIn(false);
    });
  }, []);

  return (
    <BrowserRouter>
      {["admin", "superadmin"].includes(currentUser.role) ? (
        <>
          <AdminNavbar />
          <Routes>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/authors" element={<Authors />} />
            <Route path="/admin/post/:postSlug" element={<Post />} />
            <Route path="*" element={<AdminHome />} />
          </Routes>
        </>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/addTutorial" element={<AddTutorials />} />
            <Route path="/myTutorials" element={<MyTutorials />} />
            <Route path="/myTutorials/:postSlug" element={<Post />} />
            <Route path="/showPost/:slug" element={<ShowPost />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
