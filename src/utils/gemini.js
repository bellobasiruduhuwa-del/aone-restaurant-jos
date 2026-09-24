// AI helper — powered by Groq (fast, free, reliable).
// Keep the public function name so existing callers do not need to change.
// The API key stays server-side; /api/groq is provided by the Vite dev proxy.

const MODEL = "llama-3.3-70b-versatile";

export async function askGemini(prompt, systemInstruction) {
  const messages = [];
  if (systemInstruction) {
    messages.push({ role: "system", content: systemInstruction });
  }
  messages.push({ role: "user", content: prompt });

  const response = await fetch("/api/groq", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`AI request failed: ${errText || response.statusText || response.status}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content || "";
  return text.trim();
}
