import React, { useEffect, useRef, useState } from "react";
import { subscribeToProducts } from "../firebase/products";
import { useSettings } from "../context/SettingsContext";
import { askGemini } from "../utils/gemini";

export default function ChatWidget() {
  const { settings } = useSettings();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm AONE's menu assistant. Ask me about dishes, prices, or what to order 🍽️",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    const unsub = subscribeToProducts(setProducts, () => setProducts([]));
    return unsub;
  }, []);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);

    const menuList = products
      .map(
        (p) =>
          `${p.name} (${p.category}) - ${settings.currencySymbol || "₦"}${p.price}${
            p.available === false ? " [currently unavailable]" : ""
          }`
      )
      .join("\n");

    const systemInstruction = `You are a friendly, concise assistant for ${
      settings.brandName || "AONE Restaurant"
    }, a restaurant in Jos, Nigeria. Only recommend dishes from this exact menu list, and always use the exact prices given. If asked about something not on the menu, politely say it isn't available. Keep answers short (2-4 sentences), warm, and helpful. To order, tell customers to add items to their cart and checkout via WhatsApp. Menu:\n${menuList}`;

    try {
      const reply = await askGemini(text, systemInstruction);
      setMessages((m) => [
        ...m,
        { role: "assistant", text: reply || "Sorry, I couldn't get a response. Please try again." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Sorry, something went wrong. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-24 right-5 z-50 bg-palm text-cream w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl"
        aria-label="Chat with us"
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="fixed bottom-40 right-5 z-50 w-[90vw] max-w-sm h-[60vh] bg-white rounded-2xl shadow-2xl border border-ink/10 flex flex-col overflow-hidden">
          <div className="bg-palm text-cream px-4 py-3 font-display">Ask AONE 🍽️</div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                  m.role === "user"
                    ? "bg-jollof text-cream ml-auto rounded-br-sm"
                    : "bg-ink/5 text-ink rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="bg-ink/5 text-ink/50 px-3 py-2 rounded-2xl rounded-bl-sm text-sm max-w-[85%]">
                Typing…
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={sendMessage} className="flex gap-2 p-2 border-t border-ink/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the menu…"
              className="flex-1 border border-ink/15 rounded-full px-4 py-2 text-sm outline-none focus:border-jollof"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-jollof text-cream px-4 py-2 rounded-full text-sm disabled:opacity-60"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
