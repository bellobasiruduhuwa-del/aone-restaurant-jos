// Google Gemini helper.
// Calls Gemini's free API directly from the browser. The API key here is
// meant for client-side use on the free tier (same pattern as the ImgBB key).

const GEMINI_API_KEY = "AQ.Ab8RN6Jy14tNj3z1TmB-Tn3Fb4T7IMY3B3_5LyLlkBkr8DS_CQ";
const MODEL = "gemini-2.0-flash";

export async function askGemini(prompt, systemInstruction) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };
  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Gemini request failed: ${errText || response.status}`);
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
  return text.trim();
}
