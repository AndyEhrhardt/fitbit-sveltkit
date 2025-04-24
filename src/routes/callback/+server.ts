// src/routes/callback/+server.ts
import { json, redirect } from '@sveltejs/kit';
// import env 
import { env } from '$env/dynamic/private';
export const GET = async ({ url }) => {
  const code = url.searchParams.get('code');
  const clientId = env.OAUTH2_CLIENT_ID; 
  const clientSecret = env.FIT_BIT_SECRET; 
  const redirectUri = 'http://localhost:5173/callback';
console.log('Code received from Fitbit:', code); // Log the code for debugging
console.log('Client ID:', clientId); // Log the client ID for debugging
console.log('Client Secret:', clientSecret); // Log the client secret for debugging
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const res = await fetch('https://api.fitbit.com/oauth2/token', {
  method: 'POST',
  headers: {
    Authorization: `Basic ${basicAuth}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    client_id: clientId,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
    code,
  }),
});

  const data = await res.json();

  console.log('Fitbit token response:', data); // access_token, refresh_token, etc.

  // You might want to redirect or return JSON for testing
  return json(data);
};