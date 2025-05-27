import { prisma } from "$lib/server/prisma";

/**
 * Retrieves Fitbit metrics for a specific user from the database.
 * @param {Date} startDate - The start date for the metrics query.
 * @param {Date} endDate - The end date for the metrics query.
 * @returns {Promise<Array>} - A promise that resolves to an array of Fitbit metrics.
 * @throws {Error} - Throws an error if no metrics are found for the user.
 */
export const getFitbitMetricsFromDB = async (startDate: Date, endDate: Date) => {
  const metrics = await prisma.fitbitDailyMetrics.findMany({
    where: {
    date: {
      in: [startDate, endDate],
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
}
