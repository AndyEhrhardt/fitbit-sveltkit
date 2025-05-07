<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<p>yoooooo</p>
<a href={fitbitAuthUrl}>Connect to FitBit</a>
<a href="/steps">steps</a>

<script>
    
    const clientId = '23Q8CK'; // Replace with your actual client ID
const redirectUri = 'http://localhost:5173/callback'; // Update this based on your setup
const scope = 'activity	heartrate	sleep	nutrition	weight	temperature	respiratory_rate'; 

const fitbitAuthUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&expires_in=604800`;
  </script>