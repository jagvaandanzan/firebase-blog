import { addDoc, collection} from "firebase/firestore";
import React, {  useState } from "react";
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
        </div>
      </div>
    </form>
  );
}
