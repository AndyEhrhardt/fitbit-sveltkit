import { json, redirect } from "@sveltejs/kit";
import { exchangeCodeForToken } from "$lib/fitbit/fitbitClient";
import { syncFitbitAndSummarize } from "$lib/jobs/syncFitbit";
export const GET = async ({ url, cookies }) => {
  const temporaryAuthorizationCode = url.searchParams.get("code");

  if (!temporaryAuthorizationCode) {
    return json(
      { error: "Missing temporaryAuthorizationCode" },
      { status: 400 }
    );
  }
  console.log(
    "temporaryAuthorizationCode from URL",
    temporaryAuthorizationCode
  );
  await syncFitbitAndSummarize(temporaryAuthorizationCode);
  // TODO use a try catch here in the future
  return redirect(302, "/success");
};
