import { db } from '@/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

interface DataObject {
  comment?: string;
  createdAt?: string;
  displayName?: string | null;
  uid?: string;
  introduceText?: string;
  pokemons?: string;
}

export const addDocument = async (collectionPath: string, data: DataObject) => {
  const ref = collection(db, collectionPath);
  await addDoc(ref, data);
};

export const deleteDocument = async (documentPath: string) => {
  const ref = doc(db, documentPath);
  await deleteDoc(ref);
};

export const updateDocument = async (
  collectionPath: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [x: string]: any },
) => {
  const ref = doc(db, collectionPath);
  await updateDoc(ref, data);
};

export const getDocument = async (documentPath: string) => {
  const ref = doc(db, documentPath);
  const docSnap = await getDoc(ref);
  return docSnap.exists() ? docSnap : undefined;
};

export const setDocument = async (documentPath: string, data: DataObject) => {
  const ref = doc(db, documentPath);
  await setDoc(ref, data);
};
