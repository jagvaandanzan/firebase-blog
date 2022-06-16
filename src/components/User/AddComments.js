import { addDoc, collection, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../App";
import { db } from "../../firebase.config";
import { postIdState } from "./Posts";

export default function AddComments() {
  const postId = useRecoilValue(postIdState);
  console.log("🚀 ~ file: AddComments.js ~ line 11 ~ AddComments ~ postId", postId);
  const currentUser = useRecoilValue(currentUserState);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const postComment = async (e) => {
    try {
      e.preventDefault();
      const colRef = collection(db, "comments");
      await addDoc(colRef, {
        postId: postId,
        commentorId: currentUser.uid,
        commentorName: currentUser.username,
        commentText: comment,
        createdDate: new Date().toLocaleString()
      });
      setComment("");
    } catch (error) {
      alert(e.message);
    }
  };

  return (
    <form className="my-10">
      <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200  ">
        <div className="py-2 px-4 bg-white rounded-t-lg ">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="px-2 w-full text-sm text-gray-900 bg-white  "
            placeholder="Write a comment..."
            required></textarea>
        </div>
        <div className="flex justify-between items-center py-2 px-3 border-t ">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            onClick={(e) => (currentUser.uid ? postComment(e) : navigate("/signIn"))}>
            {currentUser.uid ? "Post comment" : "Login to comment"}
          </button>
          <div className="flex pl-0 space-x-1 sm:pl-2">
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
