// src/lib/jobs/syncFitbit.ts
import {
  exchangeCodeForToken,
  refreshFitbitAccessToken,
} from "$lib/fitbit/fitbitClient";
import { fetchFitbitDataFromAPI } from "$lib/fitbit/fetchFitbitDataFromAPI";
import { postFitBitData } from "$lib/fitbit/postFitbitData";

export async function syncFitbitAndSummarize(
  temporaryAuthorizationCode?: string
) {
  console.log("Syncing Fitbit data...");
  let access_token: string;
  // TODO: uncomment this when done testing
  // if temporaryAuthorizationCode is not provided, use the refresh token
  // 1. If we have a temporary authorization code, exchange it for an access token, otherwise use the refresh token
  if (temporaryAuthorizationCode) {
    const tokens = await exchangeCodeForToken(temporaryAuthorizationCode);
    access_token = tokens.access_token;
  } else {
    const tokens = await refreshFitbitAccessToken();
    access_token = tokens.access_token;
    // Optional: persist tokens.refresh_token again, since it rotates
  }
  // 2. Pull Fitbit data from the Fitbit API
  const fitbitData = await fetchFitbitDataFromAPI(access_token);

  // 3. Save Fitbit metrics to DB
  const savedMetrics = await postFitBitData(fitbitData);

  console.log("Saved metrics:", savedMetrics);
}
