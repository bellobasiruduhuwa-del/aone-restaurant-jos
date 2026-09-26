// src/firebase/orders.js
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const ordersRef = collection(db, "orders");

export const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Ready",
  "Out for Delivery",
  "Completed",
  "Cancelled",
];

/**
 * Creates the order document in Firestore BEFORE the WhatsApp message is
 * generated, so every order — even ones the customer abandons on WhatsApp —
 * is recorded and visible to the admin.
 */
export async function createOrder(order) {
  const docRef = await addDoc(ordersRef, {
    customerName: order.customerName,
    phone: order.phone,
    address: order.address || "",
    orderType: order.orderType, // 'Dine-in' | 'Takeaway' | 'Delivery'
    items: order.items, // [{ productId, name, price, quantity }]
    subtotal: order.subtotal,
    takeawayFee: order.takeawayFee || 0,
    deliveryFee: order.deliveryFee || 0,
    total: order.total,
    notes: order.notes || "",
    status: "Pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function fetchOrders() {
  const q = query(ordersRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function subscribeToOrders(callback, onError) {
  const q = query(ordersRef, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

export async function updateOrderStatus(id, status) {
  await updateDoc(doc(db, "orders", id), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteOrder(id) {
  await deleteDoc(doc(db, "orders", id));
}

/**
 * Public order lookup by ID — used by the customer-facing "Track your
 * order" page. Anyone with the exact order ID (from their WhatsApp
 * confirmation) can look it up, but the order list itself stays
 * admin-only, so customers can't browse each other's orders.
 */
export async function getOrder(orderId) {
  const snap = await getDoc(doc(db, "orders", orderId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/** Live status updates for one order, for the tracking page. */
export function subscribeToOrder(orderId, onData, onError) {
  return onSnapshot(
    doc(db, "orders", orderId),
    (snap) => onData(snap.exists() ? { id: snap.id, ...snap.data() } : null),
    onError
  );
}
