import { prisma } from "$lib/server/prisma";
import dayjs from "dayjs";

export async function  postFitBitData(data: any) {
  const { sleepSummaryToday, hrvDataToday, activitySummaryToday } = data;

  // console.log("sleepSummaryToday", sleepSummaryToday);
  // console.log("hrvDataToday", hrvDataToday);
  // console.log("activitySummaryToday", activitySummaryToday);
  const savedMetrics = await prisma.fitbitDailyMetrics.create({
    data: {
      date: dayjs().startOf('day').subtract(2, 'day').toDate().toISOString(),
      sleepTotal: sleepSummaryToday?.totalMinutesAsleep ?? 0,
      sleepRem: sleepSummaryToday?.stages?.rem ?? 0,
      sleepDeep: sleepSummaryToday?.stages?.deep ?? 0,
      sleepLight: sleepSummaryToday?.stages?.light ?? 0,
      sleepWake: sleepSummaryToday?.stages?.wake ?? 0,
      restingHeartRate: activitySummaryToday?.restingHeartRate ?? 0,
      dailyRmssd: Math.trunc(hrvDataToday?.[0]?.value?.dailyRmssd ?? 0),
      deepRmssd: Math.trunc(hrvDataToday?.[0]?.value?.deepRmssd ?? 0),
      activityCal: activitySummaryToday?.activityCalories ?? 0,
      sedentaryMinutes: activitySummaryToday?.sedentaryMinutes ?? 0,
      lightlyActiveMinutes: activitySummaryToday?.lightlyActiveMinutes ?? 0,
      fairlyActiveMinutes: activitySummaryToday?.fairlyActiveMinutes ?? 0,
      veryActiveMinutes: activitySummaryToday?.veryActiveMinutes ?? 0,
    },
  });
  console.log("✅ Fitbit data saved:", savedMetrics);
  return savedMetrics;
}
