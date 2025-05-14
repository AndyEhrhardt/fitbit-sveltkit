import { json, redirect } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const GET = async ({ url, cookies }) => {
  const code = url.searchParams.get("code");
  if (!code) {
    return json({ error: "Missing code" }, { status: 400 });
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
  console.log("data", data);
  cookies.set("fitbit_access_token", data.access_token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return redirect(302, "/success");
};
