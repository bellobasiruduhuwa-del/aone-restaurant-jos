import express from "express";

const URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send(`<!doctype html>
<meta name="viewport" content="width=device-width, initial-scale=1">
<body style="font-family:sans-serif;padding:16px;max-width:600px;margin:auto">
<div id="setup">
  <h3>Paste your Groq API key</h3>
  <input id="key" style="width:100%;padding:10px" placeholder="gsk_...">
  <button onclick="saveKey()" style="margin-top:8px;padding:10px">Save key</button>
</div>
<div id="chat" style="display:none">
  <div id="log" style="white-space:pre-wrap;margin-bottom:12px"></div>
  <input id="msg" style="width:100%;padding:10px" placeholder="Type a message">
  <button onclick="send()" style="margin-top:8px;padding:10px">Send</button>
  <button onclick="resetKey()" style="margin-top:8px;padding:10px">Change key</button>
</div>
<script>
const $ = id => document.getElementById(id);
function show() {
  const k = localStorage.getItem("groqKey");
  $("setup").style.display = k ? "none" : "block";
  $("chat").style.display = k ? "block" : "none";
}
function saveKey() { localStorage.setItem("groqKey", $("key").value.trim()); show(); }
function resetKey() { localStorage.removeItem("groqKey"); show(); }
async function send() {
  const message = $("msg").value.trim(); if (!message) return;
  $("log").textContent += "You: " + message + "\\n";
  $("msg").value = "";
  const r = await fetch("/chat", { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, key: localStorage.getItem("groqKey") }) });
  const d = await r.json();
  $("log").textContent += "AI: " + (d.reply || "Error: " + d.error) + "\\n\\n";
}
show();
</script>`));

app.post("/chat", async (req, res) => {
  try {
    const { message, key } = req.body;
    if (!key) return res.status(400).json({ error: "No key saved" });
    const r = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: MODEL, messages: [{ role: "user", content: message }] }),
    });
    if (!r.ok) return res.status(500).json({ error: await r.text() });
    const data = await r.json();
    res.json({ reply: (data?.choices?.[0]?.message?.content || "").trim() });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(3000, "0.0.0.0", () => console.log("Open the Webview on port 3000"));
