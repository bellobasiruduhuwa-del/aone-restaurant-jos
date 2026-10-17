// Client-side image compression.
//
// Product photos picked straight from a phone camera are often 3-8MB.
// Shrinking them in the browser before they're uploaded (to ImgBB) makes
// every page that shows a product photo load noticeably faster on slow
// or expensive mobile data — with no visible quality loss at the sizes
// this app actually displays images (product cards, product detail).
//
// If anything goes wrong (unsupported format, canvas failure), we fall
// back to the original file so an upload never breaks because of this.

export async function compressImage(file, { maxDimension = 1280, quality = 0.78 } = {}) {
  if (!file || !file.type?.startsWith("image/")) return file;

  try {
    const bitmap = await loadBitmap(file);
    const { width, height } = fitWithin(bitmap.width, bitmap.height, maxDimension);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );
    if (!blob) return file;

    // Only use the compressed version if it's actually smaller.
    if (blob.size >= file.size) return file;

    const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

function loadBitmap(file) {
  if ("createImageBitmap" in window) {
    return createImageBitmap(file);
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function fitWithin(width, height, maxDimension) {
  if (width <= maxDimension && height <= maxDimension) return { width, height };
  const scale = maxDimension / Math.max(width, height);
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}
