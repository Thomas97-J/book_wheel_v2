import { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  viewCount?: number;
}
