import React from "react";
import { atom, useRecoilState } from "recoil";
import { approveModalState } from "./NewPosts";

export const confirmState = atom({
  key: "confirm",
  default: false
});

export const showConfirmModalState = atom({
  key: "showConfirmModal",
  default: false
});
export default function ConfirmModal({ approvePost, approve, selectedItem, selectedDeleteItem, deleteUser, remove }) {
  const [modalShow, setModalShow] = useRecoilState(showConfirmModalState);
  const [confirm, setConfirm] = useRecoilState(confirmState);

  const confirmHandler = () => {
    setConfirm(!confirm);
    approve && approvePost(selectedItem);
    remove && deleteUser(selectedDeleteItem);
    setModalShow(false);
  };

  return (
    <div tabIndex="-1" className="absolute w-full h-full backdrop-blur-sm z-10">
      <div className="absolute left-1/2 -translate-x-1/2 p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={() => setModalShow(false)}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
          </button>
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you?</h3>
            <button
              type="button"
              className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              onClick={confirmHandler}>
              Yes, I'm sure
            </button>
            <button
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => setModalShow(false)}>
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
