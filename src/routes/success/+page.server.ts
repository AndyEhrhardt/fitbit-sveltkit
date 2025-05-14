import { fetchFitBitData } from "./fetchFitBitData";
import { fail, redirect } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function load({ cookies }) {
  const accessToken = cookies.get("fitbit_access_token");
  if (!accessToken) {
    return {
      status: 401,
      body: { error: "Missing access token" },
    };
  }

  const fitBitData = await fetchFitBitData(accessToken);

  return { fitBitData };
}

export const actions = {
  submit: async ({ request }) => {
    const { summary } = await request.json();
    console.log("Summary: asdfasdf", summary);
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [
    //     {
    //       role: "system",
    //       content:
    //         "You are a friendly and knowledgeable fitness and recovery assistant.",
    //     },
    //     {
    //       role: "user",
    //       content: summary,
    //     },
    //   ],
    // });

    // return new Response(
    //   JSON.stringify({ reply: response.choices[0].message.content }),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
  },
};
