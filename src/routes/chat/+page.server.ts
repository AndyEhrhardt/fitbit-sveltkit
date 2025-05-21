import { prisma } from "$lib/server/prisma";
import { formatString } from "./formatString";

export const load = async () => {
  const dailyFitBitData = await prisma.fitbitDailyMetrics.findFirst({
    orderBy: {
      date: "desc",
    },
  });
  console.log("dailyFitBitData", dailyFitBitData);
  let gptReply = "";
  let sending = false;
  let textToSend = formatString(dailyFitBitData);

  const res = await fetch("chat/api/submit", {
    method: "POST",
    body: new URLSearchParams({ summary: textToSend }),
  });
  const { reply } = await res.json();
  gptReply = reply;
  sending = false;

  return { dailyFitBitData };
};
