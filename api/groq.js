// api/groq.js
// A Vercel Serverless Function. Runs on Vercel's servers, never in the
// browser — so GROQ_API_KEY (set in Vercel > Settings > Environment
// Variables) never gets shipped to visitors' devices or committed to git.
// The frontend (src/utils/gemini.js) calls "/api/groq" instead of Groq
// directly; this function adds the real key and forwards the request.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server is missing GROQ_API_KEY" });
    return;
  }

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await groqResponse.json();
    res.status(groqResponse.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy request to Groq failed" });
  }
}
