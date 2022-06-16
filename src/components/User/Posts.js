import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { db } from "../../firebase.config";
import { searchValueState } from "./Search";

export const postIdState = atom({
  key: "postId",
  default: ""
});

export default function Posts() {
  const [postList, setPostList] = useState([]);
  const [postId, setPostId] = useRecoilState(postIdState);
  const searchValue = useRecoilValue(searchValueState);
  console.log("🚀 ~ file: Posts.js ~ line 17 ~ Posts ~ searchValue", searchValue);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), where("approved", "==", true));
      const res = await getDocs(q);
      setPostList(
        res.docs.filter((el) => {
          if (searchValue === "") return el.data();
          else return el.data().postTitle.toLowerCase().includes(searchValue);
        })
      );
      console.log("🚀 ~ file: Posts.js ~ line 32 ~ fetchPosts ~ Data", postList);
    };
    fetchPosts();
  }, [searchValue]);

  return (
    <div className="w-full max-w-5xl mx-auto my-10 flex flex-wrap gap-5">
      {postList.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl shadow max-w-xs flex flex-col py-5 px-10 space-y-4 hover:-translate-y-1 hover:shadow-lg hover:scale-110 transition ease-in-out delay-150  hover:cursor-pointer"
          onClick={() => {
            navigate(`/showPost/${item.data().postSlug}`);
            setPostId(item.id);
          }}>
          <h1 className="text-lg text-blue-500 font-bold uppercase">"Tutorial"</h1>
          <h1 className="text-2xl font-bold text-gray-800">{item.data().postTitle}</h1>
          <p className="text-slate-700">@{item.data().authorName}</p>
          <p className="text-slate-700">{item.data().createdDate}</p>
        </div>
      ))}
    </div>
  );
}
