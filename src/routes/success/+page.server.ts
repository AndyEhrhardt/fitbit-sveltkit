import { fetchFitBitData } from "./fetchFitBitData";
import { fail, redirect } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import OpenAI from "openai";
import { postFitBitData } from "./postFitBitData";

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
  await postFitBitData(fitBitData);
  return { fitBitData };
}
