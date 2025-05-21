import OpenAI from "openai";
import { env } from "$env/dynamic/private";
import type { RequestEvent } from "@sveltejs/kit";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function POST({ request }: RequestEvent) {
  const formData = await request.formData();
  const summary = formData.get("summary")?.toString();

  if (!summary) {
    return new Response(JSON.stringify({ error: "No summary provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content:
          "You are a friendly and knowledgeable fitness coach. Give me recommendations for whether or not I should be working out, nutrition and recovery based on the data I share with you.",
      },
      { role: "user", content: summary },
    ],
  });

  return new Response(
    JSON.stringify({ reply: response.choices[0].message.content }),
    { headers: { "Content-Type": "application/json" } }
  );
}
