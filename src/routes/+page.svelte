<script>
  const clientId = "23Q8CK";
  const redirectUri = "http://localhost:5173/callback";
  const scope = "activity heartrate sleep weight respiratory_rate";
  const fitbitAuthUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&expires_in=604800`;
</script>

<a href={fitbitAuthUrl} class="btn preset-filled-primary-500">Connect to FitBit</a>
