// AI helper — now powered by Groq (fast, free, reliable).
// Function name kept as askGemini so every other file that imports it
// (ChatWidget, Cart, Products) doesn't need to change at all.

const GROQ_API_KEY = "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";
const MODEL = "llama-3.3-70b-versatile";

export async function askGemini(prompt, systemInstruction) {
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const messages = [];
  if (systemInstruction) {
    messages.push({ role: "system", content: systemInstruction });
  }
  messages.push({ role: "user", content: prompt });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`AI request failed: ${errText || response.status}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content || "";
  return text.trim();
}
