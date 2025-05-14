<script lang="ts">
  let gptReply = "";
  let sending = false;

  async function sendSummary() {
    sending = true;
    const res = await fetch("?/submit", {
      method: "POST",
      body: new URLSearchParams({ summary: textToSend }),
    });

    const { reply } = await res.json();
    gptReply = reply;
    sending = false;
  }
  export let data;

  const fitBitData = data.fitBitData;

  const compareToYesterdayTextGenerator = (
    firstValue: number,
    secondValue: number,
    unit: string
  ) => {
    const difference = Math.abs(firstValue - secondValue);
    const addS = difference > 1 && unit !== "bpm" ? "s" : "";
    if (firstValue > secondValue) {
      return `up ${difference} ${unit}${addS}`;
    } else if (firstValue < secondValue) {
      return `down ${difference} ${unit}${addS}`;
    } else {
      return "no change";
    }
  };

  const {
    sleepSummaryToday,
    hrvDataToday,
    activitySummaryToday,
    sleepSummaryYesterday,
    hrvDataYesterday,
    activitySummaryYesterday,
  } = fitBitData || {};

  let textToSend = "";

  if (
    sleepSummaryToday &&
    sleepSummaryYesterday &&
    activitySummaryToday &&
    activitySummaryYesterday &&
    hrvDataToday &&
    hrvDataYesterday
  ) {
    textToSend = `FitBit Data Summary for ${new Date().toLocaleDateString()}\n\n
  Sleep: ${sleepSummaryToday?.totalMinutesAsleep} minutes
  ${compareToYesterdayTextGenerator(
    sleepSummaryToday?.totalMinutesAsleep,
    sleepSummaryYesterday?.totalMinutesAsleep,
    "minute"
  )} from yesterday \n
  Sleep Stages: \n
  Deep Sleep: ${sleepSummaryToday?.stages.deep} minutes
  ${compareToYesterdayTextGenerator(
    sleepSummaryToday?.stages.deep,
    sleepSummaryYesterday?.stages.deep,
    "minute"
  )} from yesterday \n
  
  REM Sleep: ${sleepSummaryToday?.stages.rem} minutes
  ${compareToYesterdayTextGenerator(
    sleepSummaryToday?.stages.rem,
    sleepSummaryYesterday?.stages.rem,
    "minute"
  )} from yesterday \n
  Light Sleep: ${sleepSummaryToday?.stages.light} minutes
    ${compareToYesterdayTextGenerator(
      sleepSummaryToday?.stages.light,
      sleepSummaryYesterday?.stages.light,
      "minute"
    )} from yesterday \n
  Awake Time: ${sleepSummaryToday?.stages.wake} minutes
    ${compareToYesterdayTextGenerator(
      sleepSummaryToday?.stages.wake,
      sleepSummaryYesterday?.stages.wake,
      "minute"
    )} from yesterday \n
    Resting HR: ${activitySummaryToday?.restingHeartRate} bpm
    ${compareToYesterdayTextGenerator(
      activitySummaryToday?.restingHeartRate,
      activitySummaryYesterday?.restingHeartRate,
      "bpm"
    )} from yesterday \n
    HRV(daily): ${Math.trunc(hrvDataToday?.[0]?.value?.dailyRmssd) ?? "n/a"} ms
    ${compareToYesterdayTextGenerator(
      Math.trunc(hrvDataToday?.[0]?.value?.dailyRmssd),
      Math.trunc(hrvDataYesterday?.[0]?.value?.dailyRmssd),
      "millisecond"
    )} from yesterday \n
    HRV(deep): ${hrvDataToday?.[0]?.value?.deepRmssd ?? "n/a"} ms
    ${compareToYesterdayTextGenerator(
      Math.trunc(hrvDataToday?.[0]?.value?.deepRmssd),
      Math.trunc(hrvDataYesterday?.[0]?.value?.deepRmssd),
      "millisecond"
    )} from yesterday \n
  Activity Yesterday: \n 
    Steps: ${activitySummaryYesterday?.steps} \n
    Calories Burned from Activity: ${activitySummaryYesterday?.activityCalories} \n
    Sedentary Minutes: ${activitySummaryYesterday?.sedentaryMinutes} \n
    Lightly Active Minutes: ${activitySummaryYesterday?.lightlyActiveMinutes} \n
    Fairly Active Minutes: ${activitySummaryYesterday?.fairlyActiveMinutes} \n
    Very Active Minutes Score: ${activitySummaryYesterday?.veryActiveMinutes} \n
  `;
  }
</script>

<h2>The Page for the Data</h2>

{#if fitBitData}
  <h2>Today's Fitbit Summary</h2>
  {textToSend}
  <button on:click={sendSummary} disabled={sending}>
    {sending ? "Sending..." : "Send to ChatGPT"}
  </button>
{:else}
  <p>Loading or missing data...</p>
{/if}

{#if gptReply}
  <div class="gpt-reply">
    <h3>GPT Response</h3>
    <p>{gptReply}</p>
  </div>
{/if}
