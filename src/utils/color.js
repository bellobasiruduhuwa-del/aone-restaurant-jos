// src/utils/color.js
export function hexToRgbTriple(hex) {
  if (!hex || typeof hex !== "string") return null;
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return null;
  return `${r} ${g} ${b}`;
}

export function rgbTripleToHex(triple) {
  if (!triple || typeof triple !== "string") return "#000000";
  const parts = triple.trim().split(/\s+/).map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return "#000000";
  return "#" + parts.map((n) => n.toString(16).padStart(2, "0")).join("");
}
