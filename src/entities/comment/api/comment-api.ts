import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/shared/config/firebase";
import { Comment } from "../model/types";

const COLLECTION_NAME = "comments";

export const getComments = async (postId: string): Promise<Comment[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("postId", "==", postId),
    orderBy("createdAt", "asc"),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Comment[];
};

export const createComment = async (
  comment: Omit<Comment, "id" | "createdAt">,
): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...comment,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const deleteComment = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};
