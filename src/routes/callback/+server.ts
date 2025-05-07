import { json, redirect } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const GET = async ({ url }) => {
  const code = url.searchParams.get("code");
  if (!code) {
    return json({ error: 'Missing code' }, { status: 400 });
  }
  const clientId = env.OAUTH2_CLIENT_ID;
  const clientSecret = env.FIT_BIT_SECRET;
  const redirectUri = "http://localhost:5173/callback";
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

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

  const data = await res.json();

  console.log("Fitbit token response:", data); // access_token, refresh_token, etc.

  return redirect(302, '/success'); 
};
