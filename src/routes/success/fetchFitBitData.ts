const BASE_URL = 'https://api.fitbit.com/1/user/-';

export async function fetchFitBitData() {
  const accessToken = ''

  const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  console.log(`${BASE_URL}/heart/date/${today}/1d.json`)

  const [sleepRes, 
    hrRes, 
    hrvRes, 
    activityRes] = await Promise.all([
    fetch(`${BASE_URL}/sleep/date/${today}.json`, { headers }),
    fetch(`${BASE_URL}/activities/heart/date/${today}.json`, { headers }),
    fetch(`${BASE_URL}/hrv/date/${today}.json`, { headers }),
    fetch(`${BASE_URL}/activities/date/${today}.json`, { headers })
  ]);

    console.log("Sleep response:", sleepRes);
    console.log("Heart response:", hrRes);
    console.log("HRV response:", hrvRes);
    console.log("Activity response:", activityRes);

  if (!sleepRes.ok || !hrRes.ok  || !hrvRes.ok || !activityRes.ok) {
    throw new Error('Failed to fetch one or more Fitbit endpoints.');
  }

  const sleep = await sleepRes.json();
  const heart = await hrRes.json();
  const hrv = await hrvRes.json();
  const activity = await activityRes.json();

  return {
    sleepSummary: sleep.summary,
    heartData: heart.categories,
    hrvData: hrv['hrv'],
    activitySummary: activity.summary
  };
}