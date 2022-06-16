import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../App";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";

export default function Post() {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const { postSlug } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const convertToSlug = (Text) => {
    return Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const deletePost = async () => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
    navigate("/myTutorials");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), where("postSlug", "==", postSlug));
      const res = await getDocs(q);
      res.docs.map((item) => {
        setTitle(item.data().postTitle);
        setSlug(postSlug);
        setId(item.id);
        editorRef.current.setContent(item.data().postText);
      });
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto mt-14 space-y-8 p-4 shadow-xl rounded">
      <div className="w-full flex space-x-4">
        <div className="flex w-full flex-col space-y-4">
          <label htmlFor="title" className="font-bold text-xl">
            Enter title
          </label>
          <input
            id="title"
            placeholder="Title"
            value={title}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(convertToSlug(e.target.value));
            }}
          />
        </div>
        <div className="flex w-full flex-col space-y-4">
          <label htmlFor="slug" className="font-bold text-xl">
            Slug
          </label>
          <input
            id="slug"
            disabled
            placeholder="Title"
            value={slug}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <Editor
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        apiKey="ehxzw9qhhnzjhypnjrfwnyx38pr5uaqb9chq3t7feiywda17"
        init={{
          height: 500,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount"
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
      />
      <div className="flex space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save</button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={deletePost}>
          Delete
        </button>
      </div>
    </div>
  );
}
