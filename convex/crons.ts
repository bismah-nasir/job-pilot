import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Old AI usage rows don't affect rate limits any more — keep the table small
crons.daily(
    "delete old AI usage records",
    { hourUTC: 3, minuteUTC: 0 },
    internal.aiUsage.deleteOldUsage
);

export default crons;
