import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/shared/config/firebase";
import { Post } from "../model/types";

const COLLECTION_NAME = "posts";

export const getPosts = async (): Promise<Post[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc"),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];
};

export const getPost = async (id: string): Promise<Post | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Post;
  } else {
    return null;
  }
};

export const createPost = async (
  post: Omit<Post, "id" | "createdAt" | "updatedAt">,
): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...post,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updatePost = async (
  id: string,
  post: Partial<Omit<Post, "id" | "createdAt">>,
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...post,
    updatedAt: serverTimestamp(),
  });
};

export const deletePost = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};
