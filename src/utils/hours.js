// src/utils/hours.js
// Simple daily open/close time check. Times are stored as 24-hour "HH:MM"
// strings (e.g. "08:00", "00:00"). A closeTime that is earlier than or
// equal to openTime is treated as wrapping past midnight (e.g. open 08:00,
// close 00:00 means "open until midnight").

function toMinutes(hhmm) {
  if (!hhmm || typeof hhmm !== "string") return null;
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

export function isOpenNow(openTime, closeTime, now = new Date()) {
  const open = toMinutes(openTime);
  const close = toMinutes(closeTime);
  if (open === null || close === null) return true;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const closesAtMidnightOrWraps = close <= open;

  if (closesAtMidnightOrWraps) {
    return nowMinutes >= open || nowMinutes < close;
  }
  return nowMinutes >= open && nowMinutes < close;
}
