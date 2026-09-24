// AI helper — powered by Groq (fast, free, reliable).
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
