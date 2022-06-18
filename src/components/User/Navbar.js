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
    <div className="w-full h-10 px-5 md:h-16 md:px-16  md:mb-5   shadow">
      <div className="flex w-full justify-between md:hidden">
        <button>Home</button>
        <button>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAKElEQVRIiWNgGAXDHjAisf/TwmwmKhs6CgYhGE1Fo4ByMJqKRsEQAADWCQMKYvEFtQAAAABJRU5ErkJggg==" />
        </button>
      </div>
      <div className="hidden md:flex md:justify-between md:h-full">
        <div className="h-full flex items-center ">
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
    </div>
  );
}
