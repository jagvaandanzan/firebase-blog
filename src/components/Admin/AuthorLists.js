import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "../../App";
import { auth, db } from "../../firebase.config";
import AddAdminModal, { saveState } from "./AddAdminModal";
import ConfirmModal, { confirmState, showConfirmModalState } from "./ConfirmModal";

export const showAddAdminModalState = atom({
  key: "showAddAdminModal",
  default: false
});

export default function AuthorLists() {
  const [save, setSave] = useRecoilState(saveState);
  const [selectedDeleteItem, setSelectedItem] = useState();
  const [list, setList] = useState([]);
  const [showAddAdminModal, setShowAddAdminModal] = useRecoilState(showAddAdminModalState);
  const [showDeleteModal, setShowDeleteModal] = useRecoilState(showConfirmModalState);
  const currentUser = useRecoilValue(currentUserState);
  const confirmed = useRecoilValue(confirmState);

  const deleteUser = async (item) => {
    try {
      const res = doc(db, "users", item.docId);
      await deleteDoc(res);
      setSave(true);
    } catch (e) {
      console.log("🚀 ~ file: AuthorLists.js ~ line 37 ~ deleteUser ~ e", e);
    }
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      const q = query(collection(db, "users"));
      const res = await getDocs(q);
      setList(res.docs.map((item) => ({ ...item.data(), docId: item.id })));
    };
    fetchAuthors();
    setSave(false);
  }, [save]);

  return (
    <>
      {showAddAdminModal && <AddAdminModal />}
      {showDeleteModal && <ConfirmModal selectedDeleteItem={selectedDeleteItem} remove={true} deleteUser={deleteUser} />}
      <div className="max-w-6xl mx-auto p-5 relative overflow-x-auto  sm:rounded-lg">
        <div className="flex justify-between items-center">
          <div className="p-4">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-slate-700 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  "
                placeholder="Search"
              />
            </div>
          </div>
          {currentUser.role === "superadmin" && (
            <button
              className="h-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowAddAdminModal(!showAddAdminModal)}>
              Add Admin
            </button>
          )}
        </div>
        <table className="w-full text-sm text-left text-slate-800">
          <thead className="text-xs  uppercase   ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                role
              </th>
              <th scope="col" className="px-6 py-3">
                Blog count
              </th>
              <th scope="col" className="px-6 py-3">
                Reputation point
              </th>
              <th scope="col" className="px-6 py-3">
                Salary
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index} className="bg-white border-b  hover:hover:bg-slate-100">
                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
                  {item.username}
                </th>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.role}</td>
                <td className="px-6 py-4">{item.blogCount}</td>
                <td className="px-6 py-4">{item.points}</td>
                <td className="px-6 py-4">${item.salary}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    href="#"
                    className="text-white  hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium py-2 px-2  focus:z-10 bg-red-500 "
                    onClick={() => {
                      setShowDeleteModal(!showDeleteModal);
                      setSelectedItem(item);
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
