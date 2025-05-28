import dayjs from "dayjs";

export type FitbitDailyMetrics = {
  id: string;
  date: Date;
  sleepTotal: number;
  sleepRem: number;
  sleepDeep: number;
  sleepLight: number;
  sleepWake: number;
  restingHeartRate: number;
  dailyRmssd: number;
  deepRmssd: number;
  activityCal: number;
  sedentaryMinutes: number;
  lightlyActiveMinutes: number;
  fairlyActiveMinutes: number;
  veryActiveMinutes: number;
  createdAt: Date;
};

export const formatString = (yesterdaysMetrics: FitbitDailyMetrics, todaysMetrics: FitbitDailyMetrics) => {
  console.log("Data inside formatString", todaysMetrics, yesterdaysMetrics);
  console.log(`FitBit Data Summary for yesterday ${dayjs(yesterdaysMetrics.createdAt)}`)
  // textToSend = `FitBit Data Summary for ${new Date().toLocaleDateString()}\n\n
  // Sleep: ${sleepSummaryToday?.totalMinutesAsleep} minutes
  // ${compareToYesterdayTextGenerator(
  //   sleepSummaryToday?.totalMinutesAsleep,
  //   sleepSummaryYesterday?.totalMinutesAsleep,
  //   "minute"
  // )} from yesterday \n
  // Sleep Stages: \n
  // Deep Sleep: ${sleepSummaryToday?.stages.deep} minutes
  // ${compareToYesterdayTextGenerator(
  //   sleepSummaryToday?.stages.deep,
  //   sleepSummaryYesterday?.stages.deep,
  //   "minute"
  // )} from yesterday \n
  
  // REM Sleep: ${sleepSummaryToday?.stages.rem} minutes
  // ${compareToYesterdayTextGenerator(
  //   sleepSummaryToday?.stages.rem,
  //   sleepSummaryYesterday?.stages.rem,
  //   "minute"
  // )} from yesterday \n
  // Light Sleep: ${sleepSummaryToday?.stages.light} minutes
  //   ${compareToYesterdayTextGenerator(
  //     sleepSummaryToday?.stages.light,
  //     sleepSummaryYesterday?.stages.light,
  //     "minute"
  //   )} from yesterday \n
  // Awake Time: ${sleepSummaryToday?.stages.wake} minutes
  //   ${compareToYesterdayTextGenerator(
  //     sleepSummaryToday?.stages.wake,
  //     sleepSummaryYesterday?.stages.wake,
  //     "minute"
  //   )} from yesterday \n
  //   Resting HR: ${activitySummaryToday?.restingHeartRate} bpm
  //   ${compareToYesterdayTextGenerator(
  //     activitySummaryToday?.restingHeartRate,
  //     activitySummaryYesterday?.restingHeartRate,
  //     "bpm"
  //   )} from yesterday \n
  //   HRV(daily): ${Math.trunc(hrvDataToday?.[0]?.value?.dailyRmssd) ?? "n/a"} ms
  //   ${compareToYesterdayTextGenerator(
  //     Math.trunc(hrvDataToday?.[0]?.value?.dailyRmssd),
  //     Math.trunc(hrvDataYesterday?.[0]?.value?.dailyRmssd),
  //     "millisecond"
  //   )} from yesterday \n
  //   HRV(deep): ${hrvDataToday?.[0]?.value?.deepRmssd ?? "n/a"} ms
  //   ${compareToYesterdayTextGenerator(
  //     Math.trunc(hrvDataToday?.[0]?.value?.deepRmssd),
  //     Math.trunc(hrvDataYesterday?.[0]?.value?.deepRmssd),
  //     "millisecond"
  //   )} from yesterday \n
  // Activity Yesterday: \n 
  //   Steps: ${activitySummaryYesterday?.steps} \n
  //   Calories Burned from Activity: ${
  //     activitySummaryYesterday?.activityCalories
  //   } \n
  //   Sedentary Minutes: ${activitySummaryYesterday?.sedentaryMinutes} \n
  //   Lightly Active Minutes: ${activitySummaryYesterday?.lightlyActiveMinutes} \n
  //   Fairly Active Minutes: ${activitySummaryYesterday?.fairlyActiveMinutes} \n
  //   Very Active Minutes Score: ${activitySummaryYesterday?.veryActiveMinutes} \n
  // `;
};
