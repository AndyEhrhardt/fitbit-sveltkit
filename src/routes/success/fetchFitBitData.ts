import {
  sleepSummaryToday,
  hrvDataToday,
  activitySummaryToday,
  sleepSummaryYesterday,
  hrvDataYesterday,
  activitySummaryYesterday,
} from "./tempData";

const BASE_URL = "https://api.fitbit.com/1/user/-";

export async function fetchFitBitData(accessToken: string) {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const [sleepResToday, hrvResToday, activityResToday] = await Promise.all([
    fetch(`${BASE_URL}/sleep/date/${today}.json`, { headers }),
    fetch(`${BASE_URL}/hrv/date/${today}.json`, { headers }),
    fetch(`${BASE_URL}/activities/date/${today}.json`, { headers }),
  ]);
  // fetch yesterdays data as well
  const [sleepResYesterday, hrvResYesterday, activityResYesterday] =
    await Promise.all([
      fetch(`${BASE_URL}/sleep/date/${yesterday}.json`, { headers }),
      fetch(`${BASE_URL}/hrv/date/${yesterday}.json`, { headers }),
      fetch(`${BASE_URL}/activities/date/${yesterday}.json`, { headers }),
    ]);
// console.log("Raw activityToday", JSON.stringify(sleepResToday, null, 2));

  if (sleepResToday.status === 429) {
    const reset = parseInt(
      sleepResToday.headers.get("fitbit-rate-limit-reset") || "60",
      10
    );
    const waitTime = Math.ceil(reset / 60);
    throw new Error(`🚫 Rate limit hit. Try again in ~${waitTime} minutes.`);
  }

  if (!sleepResToday.ok || !hrvResToday.ok || !activityResToday.ok) {
    throw new Error("Failed to fetch one or more Fitbit endpoints for today.");
  }

  if (
    !sleepResYesterday.ok ||
    !hrvResYesterday.ok ||
    !activityResYesterday.ok
  ) {
    throw new Error(
      "Failed to fetch one or more Fitbit endpoints for yesterday."
    );
  }

  const sleepToday = await sleepResToday.json();
  const hrvToday = await hrvResToday.json();
  const activityToday = await activityResToday.json();
  const sleepYesterday = await sleepResYesterday.json();
  const hrvYesterday = await hrvResYesterday.json();
  const activityYesterday = await activityResYesterday.json();

  // console.log("hrvToday", hrvToday);
  // console.log("hrvYesterday", hrvYesterday);
  // console.log("activityToday", activityToday);
  // console.log("activityYesterday", activityYesterday);
  // console.log("sleepToday", sleepToday);
  // console.log("sleepYesterday", sleepYesterday);

  return {
    sleepSummaryToday: sleepToday.summary,
    hrvDataToday: hrvToday["hrv"],
    activitySummaryToday: activityToday.summary,
    sleepSummaryYesterday: sleepYesterday.summary,
    hrvDataYesterday: hrvYesterday["hrv"],
    activitySummaryYesterday: activityYesterday.summary,
  };
}
