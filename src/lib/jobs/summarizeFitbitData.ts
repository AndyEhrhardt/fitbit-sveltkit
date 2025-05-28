import { getTodaysAndYesterdaysFitbitMetricsFromDB } from "$lib/fitbit/getFitbitMetricsFromDB";
import { formatString } from "$lib/fitbit/formatString"; // Your summary string builder
import { sendSummary } from "$lib/chatgpt/sendSummary";
import { prisma } from "$lib/server/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

/**
 * Gets recent Fitbit metrics, formats them, summarizes with ChatGPT,
 * and stores the session in the DB.
 */
export async function summarizeLatestFitbitMetrics() {
  // 1. Pull Fitbit data from your DB (today + yesterday)
  const startDate = dayjs().subtract(1, "day").utc().startOf("day").toDate();
  const endDate = dayjs().endOf("day").toDate();
  const { yesterdaysMetrics, todaysMetrics } =
    await getTodaysAndYesterdaysFitbitMetricsFromDB();
  console.log("Metrics fetched:", yesterdaysMetrics, todaysMetrics);
  // 2. Format the data into a summary string
  if (!yesterdaysMetrics || !todaysMetrics) {
    throw new Error("No Fitbit metrics found for this user.");
  }
  const summaryString = formatString(yesterdaysMetrics, todaysMetrics);

  // 3. Send to OpenAI for summarization
  //   const gptReply = await sendSummary(summaryString);

  // 4. Store ChatSession with messages
  //   const session = await prisma.chatSession.create({
  //     data: {
  //       metricsId: metrics[metrics.length - 1].id, // Link to the most recent day
  //       messages: {
  //         create: [
  //           {
  //             role: "user",
  //             content: summaryString,
  //           },
  //           {
  //             role: "assistant",
  //             content: gptReply,
  //           },
  //         ],
  //       },
  //     },
  //     include: {
  //       messages: true,
  //     },
  //   });

  //   return {
  //     sessionId: session.id,
  //     summary: gptReply,
  //     summaryString,
  //     metricsDates: metrics.map((m) => m.date),
  //   };
}
