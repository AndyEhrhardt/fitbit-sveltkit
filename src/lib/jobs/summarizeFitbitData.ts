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
  // const gptReply = await sendSummary(summaryString);
  const sampleResponse = `Based on your recent workouts and Fitbit data, here’s a detailed analysis and recommendations for your upcoming Push and Pull days, along with whether or not you should work out today.

---

## **Should you work out today?**
- **Workout Load:** You did your PULL workout today, so **today is already accounted for** as a training day.
- **Fitbit Recovery Metrics:**
  - **HRV** (Deep): Trending up, 61 → 70 (a good sign of adaptation/recovery)
  - **Resting HR:** Stable and low (55 → 56, both excellent for fitness)
  - **Sleep:** 440 minutes last night (~7 hrs 20 min) with reasonable deep and REM sleep
  - **Active Minutes:** Huge jump today (259) from yesterday (46); likely today's workout + increased general activity

**Summary:** You’re handling your workload well, and your recovery signals are trending positive. However, since you already did your Pull workout today and tomorrow is planned as a rest day, this is optimal—don’t add extra workouts right now. Let your body recover for quality sessions later this week.

---

## **Your Next PUSH & PULL Days**
Assuming you want *moderate progression/variation* and a slight refinement in volume (as per your note on the pec deck), here are recommendations for your next Push and Pull workouts:

---

### **Next PUSH Day**

**1. Incline Smith Bench Press (Primary Press)**
   - 3 x 8 @ 90 lbs (add 5 lbs from last time; keep the same rep scheme)
**2. Cable Chest Flyes (Accessory Chest)**
   - 3 x 10–12 @ 32.5 lbs (reduce volume by 1 set for freshness)
**3. Overhead Tricep Extension (Rope)**
   - 3 x 10 @ 70 lbs; if last set is tough, drop to 60 lbs
**4. Lateral Raises**
   - 3 x 12 (you may use 15 lbs if you feel strong, or stick to 10–12.5 lbs)
**5. Tricep Kickbacks**
   - 3 x 10 @ 22.5 lbs (same as before)
**6. **Optional: Leaned Back Pec Deck**
   - 2 x 8 @ 80–90 lbs **OR** skip and sub with Dips (bodyweight or assisted) 2 x max reps.
   - *Rationale: Reduce to 2 sets if you include, or swap out for dips to lower volume as you suggested.*

---

### **Next PULL Day**

**1. Rear Delt Cable Flies**
   - 3 x 12 @ 7.5 kg (slightly reduce sets for recovery)
**2. Neutral-Grip Pull-Ups (Superset)**
   - 4 x 4 reps (try to add a rep to any set if you’re feeling stronger, or add a 5th set at 3 reps)
**3. Lat Prayer (Cable Pullovers)**
   - 3 x 12 @ 70 lbs (same load, reduce volume one set)
**4. Incline DB Curls**
   - 3 x 8 @ 25 lbs (try for all sets at 25 lbs—use 20 lbs as backup)
**5. Lateral Raises**
   - 3 x 12 (light weight, 10–12.5 lbs)
**6. Option: Face Pulls**
   - 2 x 15 @ light weight (12–15 lbs), for rear deltoid and shoulder health

---

## **General Progression & Recovery Notes**
- **Intensity:** You’re in week 1; focus on mastering form, and leave 1-2 reps in the tank on last sets.
- **Volume:** You’re right to consider dropping excess volume if you feel fatigue. Quality reps > quantity.
- **Rest & Recovery:** Keep tomorrow as a rest day! With your current numbers, you’re recovering well. Prioritize sleep to hit consistently above 7 hours.
- **Next Week:** Gradually increase either weight or reps where you felt comfortable. Adjust volume back up if you feel fully recovered and strong.

---

### **Sample Schedule Recap**
- **Today:** PULL (done)
- **Tomorrow:** REST
- **Next Day:** PUSH (use above plan)
- **Following Day:** REST or light active recovery/cardio
- **Next:** PULL

---

Let me know if you want more detail on warmups, cooldowns, or substitution movements for any exercises! You’re off to a great start for week 1.`;

  // 4. Store ChatSession with messages
  const session = await prisma.chatSession.create({
    data: {
      metricsId: todaysMetrics.id, // Link to the most recent day
      messages: {
        create: [
          {
            role: "user",
            content: summaryString,
          },
          {
            role: "assistant",
            content: sampleResponse,
          },
        ],
      },
    },
    include: {
      messages: true,
    },
  });
  console.log("Convo Saved:", session);
  return {
    sessionId: session.id,
    summary: sampleResponse,
    summaryString,
    metricsDates: [yesterdaysMetrics.createdAt, todaysMetrics.createdAt],
  };
}
