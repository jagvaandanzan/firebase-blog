import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export const getUser = async (id) => {
  const q = query(collection(db, "users"), where("id", "==", id));
  const user = await getDocs(q);
  if (user) return;
  else throw new Error("Not found");
};
