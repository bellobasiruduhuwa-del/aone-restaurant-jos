// src/firebase/reviews.js
// Public reviews/discussion system. Anyone can post a review or reply
// (no customer login required); only the admin can delete a message.
// Replies are stored in the same collection with a `parentId` pointing
// to the review they belong to.

import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const reviewsRef = collection(db, "reviews");

/** Live subscription to every review + reply, newest first. */
export function subscribeToReviews(onData, onError) {
  const q = query(reviewsRef, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

/** Post a new top-level review. */
export async function createReview({ name, message, rating }) {
  return addDoc(reviewsRef, {
    name: name.trim(),
    message: message.trim(),
    rating: rating || null,
    parentId: null,
    createdAt: serverTimestamp(),
  });
}

/** Post a reply to an existing review. */
export async function createReply({ name, message, parentId }) {
  return addDoc(reviewsRef, {
    name: name.trim(),
    message: message.trim(),
    rating: null,
    parentId,
    createdAt: serverTimestamp(),
  });
}

/** Admin-only: delete a review or reply. */
export async function deleteReview(id) {
  return deleteDoc(doc(db, "reviews", id));
}
