import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartToast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink text-cream px-5 py-3 rounded-full shadow-xl flex items-center gap-3 text-sm">
      <span>
        Added <strong>{toast.name}</strong> · now {toast.quantity} in cart
      </span>
      <Link to="/cart" className="underline font-medium shrink-0">
        View cart
      </Link>
    </div>
  );
}
