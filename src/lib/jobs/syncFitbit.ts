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
  // const { access_token } = await exchangeCodeForToken(
  //   temporaryAuthorizationCode
  // );

  // 1. Pull Fitbit data from the Fitbit API
  const fitbitData = await fetchFitbitDataFromAPI(
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1E4Q0siLCJzdWIiOiJDRlpZVkciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJycmVzIHJ3ZWkgcmFjdCByaHIgcnNsZSIsImV4cCI6MTc0ODMyNzQxMywiaWF0IjoxNzQ4Mjk4NjEzfQ.P6YKdkKS-Fy6hzIr2JLDoEmOuCKUPNPjYvgaNW4vCLQ"
  );

  // 2. Save Fitbit metrics to DB
  const savedMetrics = await postFitBitData(fitbitData);

  console.log("Saved metrics:", savedMetrics);
}
