import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "../../App";
import { db } from "../../firebase.config";

export default function MyTutorials() {
  const [postList, setPostList] = useState([]);
  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), where("authorId", "==", currentUser.uid));
      const res = await getDocs(q);
      setPostList(res.docs.map((item) => ({ ...item.data(), docId: item.id })));
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto my-10 flex flex-wrap gap-5">
      {postList.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl shadow max-w-xs flex flex-col py-5 px-10 space-y-4 hover:-translate-y-1 hover:shadow-lg hover:scale-110 transition ease-in-out delay-150  hover:cursor-pointer"
          onClick={() => navigate(`/myTutorials/${item.postSlug}`)}>
          <h1 className="text-lg text-blue-500 font-bold uppercase">"Tutorial"</h1>
          <h1 className="text-2xl font-bold text-gray-800">{item.postTitle}</h1>
          <p className="text-slate-700">@{item.authorName}</p>
          <p className="text-slate-700">{item.createdDate}</p>
        </div>
      ))}
      {postList.length === 0 && <h1 className="text-4xl text-slate-800 font-bold ">Empty...</h1>}
    </div>
  );
}
