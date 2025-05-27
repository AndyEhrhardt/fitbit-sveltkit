import { json, redirect } from "@sveltejs/kit";
import { exchangeCodeForToken } from "$lib/fitbit/fitbitClient";
import { syncFitbitAndSummarize } from "$lib/jobs/syncFitbit";
export const GET = async ({ url, cookies }) => {
  const temporaryAuthorizationCode = url.searchParams.get("code");
  if (!temporaryAuthorizationCode) {
    return json({ error: "Missing temporaryAuthorizationCode" }, { status: 400 });
  }
  console.log("temporaryAuthorizationCode from URL", temporaryAuthorizationCode);
  try {
    await syncFitbitAndSummarize(temporaryAuthorizationCode);
    
    return redirect(302, "/success");
  } catch (err) {
    console.error("OAuth error:", err);
    return json({ error: "OAuth token exchange failed" }, { status: 500 });
  }
};
