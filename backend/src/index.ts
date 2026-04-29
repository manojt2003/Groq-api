import Groq from "groq-sdk";
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { getSystemPrompt, BASE_PROMPT } from "./prompt.js";
// import cors from "cors"

const groq = new Groq({apiKey:process.env.GROQ_API_KEY});

let app = express()
app.use(express.json())
// app.use(cors())

app.post("/templet", async (req, res) => {
  
})


app.post("/chat", async (req, res) => {
  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];

    const stream = await getGroqChatStream(messages);
    for await (const chunk of stream) {
      res.write(chunk.choices[0]?.delta?.content || "");
    }
    res.end();
  } catch (error) {
    console.error("Error in /chat:", error);
    res.status(500).json({ error: "Failed to generate chat completion" });
  }
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

