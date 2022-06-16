import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { selector, useRecoilState } from "recoil";
import { db } from "../../firebase.config";
import { saveState } from "./AddAdminModal";
import ConfirmModal, { confirmState, showConfirmModalState } from "./ConfirmModal";

export const approved = selector({
  key: "approve",
  get: ({ get }) => {
    return get(confirmState);
  }
});

export default function NewPosts() {
  const [approveModal, setApproveModal] = useRecoilState(showConfirmModalState);
  const [postList, setPostList] = useState([]);
  const [save, setSave] = useRecoilState(saveState);
  const [selectedItem, setSelectedItem] = useState();

  const approvePost = async (post) => {
    try {
      const docRef = doc(db, "posts", post.docId);
      await updateDoc(docRef, {
        approved: !post.approved,
        createdDate: new Date().toLocaleDateString()
      });
      setSave(true);
    } catch (e) {}
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"));
      const res = await getDocs(q);
      setPostList(res.docs.map((item) => ({ ...item.data(), docId: item.id })));
    };
    fetchPosts();
    setSave(false);
  }, [save]);

  return (
    <>
      {approveModal && <ConfirmModal approvePost={approvePost} approve={true} selectedItem={selectedItem} />}
      <div className="w-full max-w-6xl mx-auto mt-14 space-y-8 p-4  rounded">
        <h1 className="text-4xl text-bold uppercase text-slate-700">New Posts</h1>
        <table className="w-full text-sm text-left text-slate-800">
          <thead className="text-xs  uppercase   ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Word count
              </th>
              <th scope="col" className="px-6 py-3">
                Approve
              </th>

              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {postList.map((item, index) => (
              <tr key={index} className="bg-white border-b  hover:hover:bg-slate-100">
                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
                  {item.authorName}
                </th>
                <td className="px-6 py-4">{item.postTitle}</td>
                <td className="px-6 py-4">{item.wordCount}</td>
                <td className="px-10 py-4 ">
                  <input
                    type="checkbox"
                    checked={item.approved}
                    onChange={() => {
                      setApproveModal(!approveModal);
                      setSelectedItem(item);
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
                <td className="py-4 text-right">
                  <Link to={`/admin/post/${item.postSlug}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Read
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
