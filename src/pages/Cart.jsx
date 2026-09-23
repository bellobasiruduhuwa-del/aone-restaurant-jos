import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSettings } from "../context/SettingsContext";
import { formatNaira } from "../utils/format";
import { subscribeToProducts } from "../firebase/products";
import { askGemini } from "../utils/gemini";

export default function Cart() {
  const { items, subtotal, increment, decrement, removeItem, addItem } = useCart();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    const unsub = subscribeToProducts(setProducts, () => setProducts([]));
    return unsub;
  }, []);

  useEffect(() => {
    if (items.length === 0 || products.length === 0) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    async function getSuggestions() {
      setLoadingSuggestions(true);
      const cartNames = items.map((i) => i.name);
      const menuList = products
        .filter((p) => p.available !== false && !cartNames.includes(p.name))
        .map((p) => `${p.name} (${p.category})`)
        .join("\n");

      const prompt = `A customer's cart has: ${cartNames.join(", ")}. From this menu list only:\n${menuList}\n\nSuggest up to 3 items that go well with their order. Reply with ONLY the exact item names, one per line, nothing else.`;

      try {
        const text = await askGemini(prompt);
        const names = text
          .split("\n")
          .map((l) => l.replace(/^[-*\d.\s]+/, "").trim())
          .filter(Boolean);
        const matched = names
          .map((n) => products.find((p) => p.name.toLowerCase() === n.toLowerCase()))
          .filter(Boolean)
          .slice(0, 3);
        if (!cancelled) setSuggestions(matched);
      } catch (err) {
        console.error(err);
        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setLoadingSuggestions(false);
      }
    }

    const timer = setTimeout(getSuggestions, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [items, products]);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="font-display text-3xl mb-3">Your cart is empty</h1>
        <p className="text-ink/60 mb-8">Add something delicious from the menu to get started.</p>
        <Link to="/menu" className="bg-jollof text-cream px-6 py-3 rounded-full font-medium hover:bg-jollof-dark">
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl mb-8">Your Cart</h1>

      <div className="divide-y divide-ink/10 border-y border-ink/10 mb-8">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-xl bg-ink/5 overflow-hidden shrink-0">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.name}</p>
              <p className="text-sm text-ink/50">
                {formatNaira(item.price, settings.currencySymbol)} each
              </p>
            </div>
            <div className="flex items-center border border-ink/15 rounded-full">
              <button onClick={() => decrement(item.productId)} className="px-3 py-1.5" aria-label="Decrease quantity">
                −
              </button>
              <span className="w-6 text-center text-sm">{item.quantity}</span>
              <button onClick={() => increment(item.productId)} className="px-3 py-1.5" aria-label="Increase quantity">
                +
              </button>
            </div>
            <p className="w-24 text-right font-medium">
              {formatNaira(item.price * item.quantity, settings.currencySymbol)}
            </p>
            <button
              onClick={() => removeItem(item.productId)}
              aria-label={`Remove ${item.name}`}
              className="text-ink/30 hover:text-jollof text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {(loadingSuggestions || suggestions.length > 0) && (
        <div className="mb-8">
          <p className="text-sm font-medium text-ink/60 mb-3">
            {loadingSuggestions ? "Finding things that go well together…" : "Goes well with your order"}
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {suggestions.map((p) => (
              <div
                key={p.id}
                className="shrink-0 w-36 border border-ink/10 rounded-xl overflow-hidden bg-white"
              >
                <div className="aspect-video bg-ink/5">
                  {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />}
                </div>
                <div className="p-2.5">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-ink/50 mb-2">{formatNaira(p.price, settings.currencySymbol)}</p>
                  <button
                    onClick={() => addItem(p, 1)}
                    className="w-full text-xs bg-jollof/10 text-jollof hover:bg-jollof hover:text-cream rounded-full py-1.5 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <span className="text-ink/60">Subtotal</span>
        <span className="font-display text-xl">{formatNaira(subtotal, settings.currencySymbol)}</span>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="w-full bg-jollof text-cream py-3.5 rounded-full font-medium hover:bg-jollof-dark transition-colors"
      >
        Proceed to checkout
      </button>
    </div>
  );
}
