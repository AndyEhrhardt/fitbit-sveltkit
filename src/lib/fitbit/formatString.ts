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

export const formatString = (
  yesterdaysMetrics: FitbitDailyMetrics,
  todaysMetrics: FitbitDailyMetrics
) => {
  console.log("Data inside formatString", todaysMetrics, yesterdaysMetrics);
  return `
  My last two workouts:
    5/27 - PUSH
Incline Smith Bench – 3x8 @ 85 lbs
Cable Chest Flys – 4x10 @ 32.5lbs 
Overhead Tricep Extension (Rope) – 4x10 @ 70 lbs (last set @ 60lbs 10 reps)
Lateral Raises – 4x12 
Tricep Kickbacks – 3x10 @ 22.5lbs 
Leaned back pec deck (lower chest): 100lbs @ 8 reps then 90lbs @ 8 reps (consider 80-90lbs or drop this, might be too much volume)
5/29 - PULL (today)
Rear Delt Cable Flies – 4x12 @ 7.5 kg
Superset^ Neutral-Grip Pull-Ups – 4x4 reps
Lat Prayer (Cable Pullovers) – 4x12 @ 70 lbs
Incline DB Curls – 4x8 @ 25 lbs (last set 20lbs and 8 reps)
Lateral Raises – 4x12 (2x15 lbs, 2x10 lbs)

FitBit Stats: 
Deep HRV Today: ${todaysMetrics.deepRmssd}
Deep HRV Yesterday: ${yesterdaysMetrics.deepRmssd}
Resting HR today: ${todaysMetrics.restingHeartRate}
Resting HR Yesterday: ${yesterdaysMetrics.restingHeartRate}
Sleep total last night: ${todaysMetrics.sleepTotal}
Deep sleep last night: ${todaysMetrics.sleepDeep}
Light sleep last night: ${todaysMetrics.sleepLight}
Rem sleep last night: ${todaysMetrics.sleepRem}
Total Active minutes yesterday: ${
    yesterdaysMetrics.lightlyActiveMinutes +
    yesterdaysMetrics.fairlyActiveMinutes +
    yesterdaysMetrics.veryActiveMinutes
  }
Total Active minutes today: ${
    todaysMetrics.lightlyActiveMinutes +
    todaysMetrics.fairlyActiveMinutes +
    todaysMetrics.veryActiveMinutes
  }
  
I am on the first week of a mesocycle, assuming tomorrows a rest day write me my next push and pull day.
`;
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
