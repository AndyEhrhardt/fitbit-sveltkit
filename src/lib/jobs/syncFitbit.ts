// src/lib/jobs/syncFitbit.ts
import { exchangeCodeForToken } from "$lib/fitbit/fitbitClient";
import { fetchFitbitDataFromAPI } from "$lib/fitbit/fetchFitbitDataFromAPI";
import { postFitBitData } from "$lib/fitbit/postFitbitData";
import { formatString } from "$lib/fitbit/formatString";
import { prisma } from "$lib/server/prisma";

export async function syncFitbitAndSummarize(
  temporaryAuthorizationCode: string
) {
  console.log("Syncing Fitbit data...");

  // TODO: uncomment this when done testing
  const { access_token } = await exchangeCodeForToken(
    temporaryAuthorizationCode
  );

  // 1. Pull Fitbit data from the Fitbit API
  const fitbitData = await fetchFitbitDataFromAPI(
    temporaryAuthorizationCode
  );

  // 2. Save Fitbit metrics to DB
  const savedMetrics = await postFitBitData(fitbitData);

  console.log("Saved metrics:", savedMetrics);
}
