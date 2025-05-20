import { prisma } from "$lib/server/prisma";

export const load = async () => {
  const item = await prisma.fitbitDailyMetrics.findFirst({
    orderBy: {
      date: "desc",
    },
  });

  return { item };
};
