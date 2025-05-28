import { env } from "$env/dynamic/private";

export async function exchangeCodeForToken(code: string): Promise<{ access_token: string }> {
  const clientId = env.OAUTH2_CLIENT_ID;
  const clientSecret = env.FIT_BIT_SECRET;
  const redirectUri = "http://localhost:5173/callback"; // Update if deploying

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://api.fitbit.com/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to get access token: ${error}`);
  }

  const data = await res.json();
  console.log(data.refresh_token, data.access_token);
  return data;
}

/**
 * Refresh the Fitbit access token using a refresh token.
 * @param refreshToken The refresh token previously received from Fitbit.
 * @returns The new token response including access_token and refresh_token.
 */
export async function refreshFitbitAccessToken(): Promise<{
  access_token: string;
  user_id: string;
  expires_in: number;
}> {
  const clientId = env.OAUTH2_CLIENT_ID;
  const clientSecret = env.FIT_BIT_SECRET;
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://api.fitbit.com/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.FIT_BIT_REFRESH_TOKEN,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Fitbit token refresh failed:", data);
    throw new Error(`Failed to refresh token: ${data?.errors?.[0]?.message || JSON.stringify(data)}`);
  }

  console.log("🔄 Refreshed Fitbit token:", data.access_token);
  return data;
}