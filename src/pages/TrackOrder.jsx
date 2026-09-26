import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { subscribeToOrder } from "../firebase/orders";
import { useSettings } from "../context/SettingsContext";
import { formatNaira } from "../utils/format";

const STEPS = ["Pending", "Confirmed", "Preparing", "Ready", "Out for Delivery", "Completed"];

function StatusTimeline({ status }) {
  if (status === "Cancelled") {
    return (
      <div className="bg-jollof/10 text-jollof rounded-xl px-4 py-3 text-sm font-medium text-center">
        This order was cancelled.
      </div>
    );
  }

  const currentIndex = STEPS.indexOf(status);

  return (
    <div className="flex flex-col gap-0">
      {STEPS.map((step, i) => {
        const done = i <= currentIndex;
        const isLast = i === STEPS.length - 1;
        return (
          <div key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  done ? "bg-palm text-cream" : "bg-ink/10 text-ink/40"
                }`}
              >
                {done ? "✓" : ""}
              </div>
              {!isLast && <div className={`w-0.5 flex-1 min-h-[24px] ${done ? "bg-palm" : "bg-ink/10"}`} />}
            </div>
            <p className={`pb-6 text-sm ${done ? "font-medium text-ink" : "text-ink/40"}`}>{step}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function TrackOrder() {
  const { orderId: orderIdFromUrl } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [inputId, setInputId] = useState(orderIdFromUrl || "");
  const [order, setOrder] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!orderIdFromUrl) return;
    setLoading(true);
    const unsub = subscribeToOrder(
      orderIdFromUrl,
      (data) => {
        setOrder(data);
        setLoading(false);
      },
      () => {
        setOrder(null);
        setLoading(false);
      }
    );
    return unsub;
  }, [orderIdFromUrl]);

  function handleSearch(e) {
    e.preventDefault();
    const id = inputId.trim();
    if (!id) return;
    navigate(`/track/${id}`);
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl mb-2">Track Your Order</h1>
      <p className="text-ink/60 mb-8">
        Paste the order ID from your WhatsApp confirmation message to see its status.
      </p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-10">
        <input
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Order ID"
          className="flex-1 border border-ink/15 rounded-full px-5 py-2.5 text-sm focus:border-jollof outline-none"
        />
        <button
          type="submit"
          className="bg-jollof text-cream px-6 py-2.5 rounded-full text-sm hover:bg-jollof-dark"
        >
          Track
        </button>
      </form>

      {loading && <p className="text-ink/50 text-sm">Looking up your order…</p>}

      {order === null && !loading && (
        <p className="text-ink/50 text-sm text-center py-8">
          We couldn't find an order with that ID. Double-check it and try again.
        </p>
      )}

      {order && (
        <div className="bg-white border border-ink/10 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="font-medium">{order.customerName}</p>
              <p className="text-xs text-ink/40">{order.orderType}</p>
            </div>
            <p className="font-display text-lg text-jollof">
              {formatNaira(order.total, settings.currencySymbol)}
            </p>
          </div>

          <StatusTimeline status={order.status} />

          <div className="mt-4 pt-4 border-t border-ink/10 space-y-1">
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between text-sm text-ink/70">
                <span>
                  {item.quantity}× {item.name}
                </span>
                <span>{formatNaira(item.price * item.quantity, settings.currencySymbol)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
