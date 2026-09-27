// AI helper — powered by Groq (fast, free, reliable), via a server-side
// proxy at /api/groq so the real API key never reaches the browser.
// Function name kept as askGemini so every other file that imports it
// (ChatWidget, Cart, Products) doesn't need to change at all.

const MODEL = "llama-3.3-70b-versatile";

export async function askGemini(prompt, systemInstruction) {
  const messages = [];
  if (systemInstruction) {
    messages.push({ role: "system", content: systemInstruction });
  }
  messages.push({ role: "user", content: prompt });

  const response = await fetch("/api/groq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, messages }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`AI request failed: ${errText || response.status}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content || "";
  return text.trim();
}
