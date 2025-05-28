import { syncFitbitAndSummarize } from "$lib/jobs/syncFitbit";
import { json } from "@sveltejs/kit";

export async function POST() {
  const result = await syncFitbitAndSummarize();
  return json(result);
}
