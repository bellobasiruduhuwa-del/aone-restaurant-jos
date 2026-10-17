import { useEffect, useRef } from "react";
import { subscribeToOrders } from "../firebase/orders";

/**
 * Lives inside AdminLayout (so it's mounted on every admin page, not just
 * the Orders page). Watches for brand-new orders in real time and alerts
 * the admin two ways:
 *   1. A short beep (Web Audio API — no audio file needed).
 *   2. A real OS-level browser notification, if the admin has granted
 *      permission — so a new order is noticed even if the admin is on a
 *      different tab/app, not just a different page inside the dashboard.
 *
 * Neither alert can do anything if the admin's phone/computer is asleep or
 * the browser tab is fully closed — this only helps while the dashboard is
 * open somewhere in the background.
 */

function playNewOrderSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    [880, 1100].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.value = 0.18;
      const start = ctx.currentTime + i * 0.18;
      osc.start(start);
      osc.stop(start + 0.16);
    });
    setTimeout(() => ctx.close(), 500);
  } catch {
    // Sound is a nice-to-have, never worth breaking the page over.
  }
}

function notifyNewOrder(order) {
  try {
    if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
    const n = new Notification("New order received", {
      body: `${order.customerName || "A customer"} — ${order.orderType || ""}`.trim(),
      tag: `aone-order-${order.id}`,
    });
    n.onclick = () => {
      window.focus();
      n.close();
    };
  } catch {
    // Notifications are a bonus, never worth breaking the page over.
  }
}

export default function NewOrderWatcher() {
  const knownOrderIds = useRef(null);

  // Ask once per admin session. If the admin dismisses the browser's own
  // prompt, we never nag them again — the beep still works either way.
  useEffect(() => {
    try {
      if (typeof Notification !== "undefined" && Notification.permission === "default") {
        Notification.requestPermission();
      }
    } catch {
      /* Notification API not supported — beep-only alert still works. */
    }
  }, []);

  useEffect(
    () =>
      subscribeToOrders(
        (data) => {
          // Skip the very first snapshot (existing orders loading in) and
          // only alert once we can see truly *new* orders arrive live.
          if (knownOrderIds.current) {
            const newOnes = data.filter((o) => !knownOrderIds.current.has(o.id));
            if (newOnes.length > 0) {
              playNewOrderSound();
              newOnes.forEach(notifyNewOrder);
            }
          }
          knownOrderIds.current = new Set(data.map((o) => o.id));
        },
        () => {}
      ),
    []
  );

  return null;
}
