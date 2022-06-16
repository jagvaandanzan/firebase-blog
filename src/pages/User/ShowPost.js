import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase.config";
import parse from "html-react-parser";
import Comments from "../../components/User/Comments";

export default function ShowPost() {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const q = query(collection(db, "posts"), where("postSlug", "==", slug));
        const res = await getDocs(q);
        res.docs.map((item) => {
          setTitle(item.data().postTitle);
          setText(item.data().postText);
          setName(item.data().authorName);
          setDate(item.data().createdDate);
        });
      };
      fetchPost();
    } catch (e) {
      alert(e.message);
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col">
        <div className="mt-5 space-y-4">
          <h1 className="text-4xl font-medium text-slate-800">{title}</h1>
          <p className="text-slate-700">@{name}</p>
          <p className="text-slate-700">{date}</p>
        </div>
        <div className="mt-14">{parse(text)}</div>
        <Comments />
      </div>
    </div>
  );
}
