import { summarizeLatestFitbitMetrics } from "$lib/jobs/summarizeFitbitData";
import { json } from "@sveltejs/kit";

export async function POST() {
  const result = await summarizeLatestFitbitMetrics();
  return json(result);
}
