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
