// src/lib/chatgpt/summarize.ts

import OpenAI from "openai";
import { env } from "$env/dynamic/private";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function sendSummary(summary: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4-1",
    messages: [
      {
        role: "system",
        content:
          "You are a friendly and knowledgeable fitness coach. Give me recommendations for whether or not I should be working out today, based on the user's Fitbit data.",
      },
      {
        role: "user",
        content: summary,
      },
    ],
  });

  return response.choices[0].message.content || "[No summary returned]";
}
