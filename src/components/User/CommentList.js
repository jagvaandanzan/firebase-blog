import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { db } from "../../firebase.config";
import { postIdState } from "./Posts";

export default function CommentList() {
  const [postId, setPostId] = useRecoilState(postIdState);
  console.log("🚀 ~ file: CommentList.js ~ line 9 ~ CommentList ~ postId", postId);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(collection(db, "comments"), where("postId", "==", postId), orderBy("createdDate", "desc"));
      await onSnapshot(q, (querySnapshot) => {
        const commentList = [];
        querySnapshot.forEach((doc) => commentList.push(doc.data()));
        setComments(commentList);
      });
    };
    fetchComments();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mb-20 space-y-4  flex flex-col">
      <h1 className="text-4xl text-slate-800">Comments</h1>
      {comments.map((item, index) => (
        <div key={index} className="flex flex-col pt-4 border-t-2 py-3">
          <div className="flex space-x-4">
            <p className="text-blue-500 font-medium">{item.commentorName}</p>
            <p className="">{item.createdDate}</p>
          </div>
          <p className="text-slate-800 font-extralight">{item.commentText}</p>
        </div>
      ))}
    </div>
  );
}
