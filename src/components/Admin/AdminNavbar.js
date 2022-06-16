import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInState } from "../../App";
import { auth } from "../../firebase.config";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const loggedIn = useRecoilValue(loggedInState);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      window.location.reload(false);
    });
  };

  return (
    <div className="flex w-full h-16 px-16  justify-between items-center shadow-lg text-slate-700">
      <div className="h-full flex items-center">
        <button className="h-2/3 w-24 border-2 rounded-full border-slate-400 hover:border-slate-700" onClick={() => navigate("/admin")}>
          Home
        </button>
      </div>
      <div className="h-full flex items-center space-x-4">
        {loggedIn ? (
          <>
            <button className="h-2/3 w-24 border-2 rounded-full border-slate-400 hover:border-slate-700" onClick={() => navigate("/admin/authors")}>
              Authors
            </button>
            <button className="h-2/3 w-24 border-2 rounded-full border-slate-400 hover:border-slate-700" onClick={handleSignOut}>
              Sign out
            </button>
          </>
        ) : (
          <button className="h-2/3 w-24 border-2 rounded-full border-slate-400 hover:border-slate-700" onClick={() => navigate("/signIn")}>
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}
