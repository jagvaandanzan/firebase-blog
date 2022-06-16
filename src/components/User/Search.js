import React from "react";
import { atom, useRecoilState } from "recoil";

export const searchValueState = atom({
  key: "searchValue",
  default: ""
});
export default function Search() {
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  return (
    <div className="w-full h-56 bg-blue-500">
      <div className="h-full flex flex-col items-center justify-evenly">
        <h1 className="text-white font-bold text-5xl">Tutorials</h1>
        <p className="text-white">There are many tutorials waiting for you</p>
        <input placeholder="Search..." className="w-1/2 h-12 rounded-md pl-8" onChange={(e) => setSearchValue(e.target.value.toLocaleLowerCase())} />
      </div>
    </div>
  );
}
