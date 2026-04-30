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

export async function getGroqChatStream(messages: any[] = []) {
    return groq.chat.completions.create({
      //
      // Required parameters
      //
      messages: [
        // Set an optional system message. This sets the behavior of the
        // assistant and can be used to provide specific instructions for
        // how it should behave throughout the conversation.
        {
          role: "system",
          content: `${BASE_PROMPT}\n${getSystemPrompt()}`,
        },
        ...messages,
      ],
  
      // The language model which will generate the completion.
      model: "openai/gpt-oss-20b",

      //
      // Optional parameters
      //
  
      // Controls randomness: lowering results in less random completions.
      // As the temperature approaches zero, the model will become deterministic
      // and repetitive.
      temperature: 0.5,
  
      // The maximum number of tokens to generate. Requests can use up to
      // 2048 tokens shared between prompt and completion.
      max_completion_tokens: 4096,
  
      // Controls diversity via nucleus sampling: 0.5 means half of all
      // likelihood-weighted options are considered.
      top_p: 1,
  
      // A stop sequence is a predefined or user-specified text string that
      // signals an AI to stop generating content, ensuring its responses
      // remain focused and concise. Examples include punctuation marks and
      // markers like "[end]".
      stop: null,
  
      // If set, partial message deltas will be sent.
      stream: true,
    });
  }
  

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

