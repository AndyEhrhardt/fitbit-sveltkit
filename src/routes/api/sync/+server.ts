import { syncFitbitAndSummarize } from "$lib/jobs/syncFitbit";
import { json } from "@sveltejs/kit";

export async function POST({ cookies }) {
  const accessToken = cookies.get("fitbit_access_token");

//   if (!accessToken) {
//     return json({ error: "Missing token" }, { status: 401 });
//   }

  const result = await syncFitbitAndSummarize('6a1443d512845487becf36658cdcc84269a659f5');
  return json(result);
}
