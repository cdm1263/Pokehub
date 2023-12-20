import { db } from '@/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
} from 'firebase/firestore';

interface DataObject {
  views?: number,
  likes?: number,
  title?: string;
  postId?: string;
  userId?: string;
  userImg?: string;
  postImg?: string;
  category?: string;
  createdAt?: string;
  description?: string;
  userName?: string | null;
}

export const addCommunity = async (communityPath: string, data: DataObject) => {
  const ref = collection(db, communityPath);
  await addDoc(ref, data);
};

export const deleteCommunity = async (communityPath: string) => {
  const ref = doc(db, communityPath);
  await deleteDoc(ref);
};

export const addComment = async (communityPath: string, data: DataObject) => {
  const ref = collection(db, communityPath);
  await addDoc(ref, data);
};

export const addReplies = async (communityPath: string, data: DataObject) => {
  const ref = collection(db, communityPath);
  await addDoc(ref, data);
};
