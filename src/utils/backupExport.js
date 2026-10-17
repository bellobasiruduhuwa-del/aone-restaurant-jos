// src/utils/backupExport.js
//
// Lets the admin download a snapshot of everything stored in Firebase
// (orders, products, categories, reviews) as one JSON file, straight to
// their phone/computer. This is a simple personal backup — it does NOT
// replace a real database backup, but it means the owner always has a
// copy of their own data sitting somewhere outside Firebase, just in
// case that account is ever locked, hacked, or misconfigured.

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { fetchOrders } from "../firebase/orders";
import { fetchProducts } from "../firebase/products";
import { fetchCategories } from "../firebase/categories";

async function fetchReviewsOnce() {
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/** Firestore timestamps don't survive JSON.stringify as readable dates — convert them first. */
function toPlain(value) {
  if (value && typeof value === "object" && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }
  if (Array.isArray(value)) return value.map(toPlain);
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = toPlain(v);
    return out;
  }
  return value;
}

/**
 * Fetches everything and triggers a browser download of a single JSON
 * file named with today's date, e.g. aone-backup-2026-10-17.json.
 */
export async function downloadFullBackup() {
  const [orders, products, categories, reviews] = await Promise.all([
    fetchOrders(),
    fetchProducts(),
    fetchCategories(),
    fetchReviewsOnce(),
  ]);

  const payload = toPlain({
    exportedAt: new Date().toISOString(),
    orders,
    products,
    categories,
    reviews,
  });

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const dateStr = new Date().toISOString().slice(0, 10);

  const a = document.createElement("a");
  a.href = url;
  a.download = `aone-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return {
    orders: orders.length,
    products: products.length,
    categories: categories.length,
    reviews: reviews.length,
  };
}
