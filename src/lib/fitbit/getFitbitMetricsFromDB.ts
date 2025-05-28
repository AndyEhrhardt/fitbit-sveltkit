import { prisma } from "$lib/server/prisma";
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

/**
 * Retrieves Fitbit metrics for today from the database.
 * @param {Date} startDate - The start date for the metrics query.
 * @param {Date} endDate - The end date for the metrics query.
 * @returns {Promise<Array>} - A promise that resolves to an array of Fitbit metrics.
 * @throws {Error} - Throws an error if no metrics are found for the user.
 */
export const getYesterdaysFitbitMetricsFromDB = async () => {
  const start = dayjs().utc().subtract(1, "day").startOf("day").toDate();
  const end = dayjs().utc().subtract(1, "day").endOf("day").toDate();

  const metric = await prisma.fitbitDailyMetrics.findFirst({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  return metric;
};

/**
 * Retrieves Fitbit metrics for a specific user from the database.
 * @param {Date} startDate - The start date for the metrics query.
 * @param {Date} endDate - The end date for the metrics query.
 * @returns {Promise<Array>} - A promise that resolves to an array of Fitbit metrics.
 * @throws {Error} - Throws an error if no metrics are found for the user.
 */
export const getFitbitMetricsFromDBWithDateRange = async (
  startDate: Date,
  endDate: Date
) => {
  console.log(startDate, endDate);
  const metrics = await prisma.fitbitDailyMetrics.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  if (!metrics || metrics.length === 0) {
    throw new Error("No Fitbit metrics found for this user.");
  }

  return metrics;
};

export const getTodaysAndYesterdaysFitbitMetricsFromDB = async () => {
  const start = dayjs().utc().subtract(1, "day").startOf("day").toDate();
  const end = dayjs().utc().endOf("day").toDate();

  const metrics = await prisma.fitbitDailyMetrics.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  if (!metrics || metrics.length === 0) {
    throw new Error("No Fitbit metrics found for this user.");
  }
  const grouped = {
    yesterday: null as FitbitDailyMetrics | null,
    today: null as FitbitDailyMetrics | null,
  };

  for (const metric of metrics) {
    const dayKey = dayjs(metric.date).utc().format("YYYY-MM-DD");
    const isToday = dayKey === dayjs().utc().format("YYYY-MM-DD");
    const isYesterday =
      dayKey === dayjs().utc().subtract(1, "day").format("YYYY-MM-DD");

    if (isYesterday) {
      if (!grouped.yesterday || metric.date > grouped.yesterday.date) {
        grouped.yesterday = metric;
      }
    }

    if (isToday) {
      if (!grouped.today || metric.date > grouped.today.date) {
        grouped.today = metric;
      }
    }
  }

  return {yesterdaysMetrics: grouped.yesterday, todaysMetrics: grouped.today}
};
