const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY";

app.get("/", (req, res) => {
  res.send("🔥 WORMGPY AI AKTIF 🔥");
});

app.post("/ai", async (req, res) => {
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "WORMGPY AI jago coding." },
          { role: "user", content: req.body.message }
        ]
      })
    });

    const data = await r.json();
    res.json({ reply: data.choices[0].message.content });

  } catch {
    res.json({ reply: "❌ Error AI" });
  }
});

app.listen(3000);
