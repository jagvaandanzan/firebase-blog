import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInState } from "../../App";
import { auth } from "../../firebase.config";

export default function Navbar() {
  const navigate = useNavigate();

  const loggedIn = useRecoilValue(loggedInState);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="flex w-full h-16 px-16 mb-5  justify-between items-center shadow">
      <div className="h-full flex items-center">
        <button className="h-full w-24 border-b-4 border-transparent focus:border-blue-500 hover:text-blue-900" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
      <div className="h-full space-x-4 flex items-center">
        {loggedIn ? (
          <>
            <button
              className="h-full w-24  border-b-4 border-transparent focus:border-blue-500 hover:text-blue-900"
              onClick={() => navigate("/addTutorial")}>
              Add Tutorial
            </button>
            <button
              className="h-full w-24  border-b-4 border-transparent focus:border-blue-500 hover:text-blue-900"
              onClick={() => navigate("/myTutorials")}>
              My Tutorials
            </button>
            <button className="h-full w-24  border-b-4 border-transparent focus:border-blue-500 hover:text-blue-900" onClick={handleSignOut}>
              Sign out
            </button>
          </>
        ) : (
          <button
            className="h-full w-24  border-b-4 border-transparent focus:border-blue-500 hover:text-blue-900"
            onClick={() => navigate("/signIn")}>
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}
