import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { db } from "../../firebase.config";
import { showAddAdminModalState } from "./AuthorLists";

export const saveState = atom({
  key: "save",
  default: false
});
export default function AddAdminModal() {
  const [showModal, setShowModal] = useRecoilState(showAddAdminModalState);
  const [save, setSave] = useRecoilState(saveState);
  const [list, setList] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const changeStatus = async () => {
    try {
      const res = doc(db, "users", selectedItem.docId);
      await updateDoc(res, {
        role: "admin"
      });
      setSave(true);
      setShowModal(false);
    } catch (e) {}
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      const q = query(collection(db, "users"), where("role", "==", "author"));
      const res = await getDocs(q);
      setList(res.docs.map((item) => ({ ...item.data(), docId: item.id })));
    };
    fetchAuthors();
    setSave(false);
  }, []);

  return (
    <div className=" absolute w-full h-full z-10 backdrop-blur-sm no-scrollbar">
      <div tabIndex="-1" className="absolute left-1/2 -translate-x-1/2 p-4 w-full max-w-sm h-1/2 ">
        <div className="relative h-full bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 z-10 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal"
            onClick={() => setShowModal(false)}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
          </button>
          <div className="relative py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
          </div>
          <div className=" px-6 lg:px-8">
            <label className=" text-sm font-medium text-white">Assigned to</label>
            <div className="mt-1 relative">
              <button
                type="button"
                className="relative w-full h-9 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                onClick={() => setDropDown(!dropDown)}>
                <span className="flex items-center">{selectedItem.username}</span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
              {dropDown && (
                <ul
                  className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md  text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  tabIndex="-1"
                  role="listbox"
                  aria-labelledby="listbox-label"
                  aria-activedescendant="listbox-option-3">
                  {list.map((item, index) => (
                    <li className="text-gray-900  py-2 pl-3 pr-9 hover:bg-slate-200" key={index} role="option">
                      <button
                        className="flex w-full items-center "
                        onClick={() => {
                          setSelectedItem(item);
                          setDropDown(!dropDown);
                        }}>
                        <span className="font-normal ml-3 block truncate"> {item.username} </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div>
                <button
                  type="button"
                  className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 my-5"
                  onClick={changeStatus}>
                  Save
                </button>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 my-5"
                  onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
