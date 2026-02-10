import { Timestamp } from "firebase/firestore";

export interface Comment {
  id: string;
  content: string;
  createdAt: Timestamp;
  postId: string;
  authorId: string;
  authorName?: string; // Optional, similar to Post
}
