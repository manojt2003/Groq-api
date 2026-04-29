import { BASE_PROMPT, getSystemPrompt } from "../prompt.js";

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
      model: "llama-3.3-70b-versatile",
  
      //
      // Optional parameters
      //
      // Controls randomness: lowering results in less random completions.
      // As the temperature approaches zero, the model will become deterministic
      // and repetitive.
      temperature: 0.5,
  
      // The maximum number of tokens to generate. Requests can use up to
      // 2048 tokens shared between prompt and completion.
      max_completion_tokens: 8000,
  
      // Controls diversity via nucleus sampling: 0.5 means half of all
      // likelihood-weighted options are considered.
      top_p: 1,
  
      // If set, partial message deltas will be sent.
      stream: true,
    });
  }
  