// ImgBB upload helper.
// Uploads an image file directly from the browser to ImgBB and returns
// the public URL. The API key here is a public/client-side upload key
// (not a secret), so it's fine for it to live in the app code.

const IMGBB_API_KEY = "2c89d3168f3e8b8a3281ee2a1c540c2b";

export async function uploadToImgbb(file) {
  const url = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`ImgBB upload failed: ${errText || response.status}`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(`ImgBB upload failed: ${JSON.stringify(data)}`);
  }

  return data.data.url;
}
