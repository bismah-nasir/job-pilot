import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        role: v.union(v.literal("candidate"), v.literal("interviewer")),
        clerkId: v.string(),
    }).index("by_clerk_id", ["clerkId"]),

    interviews: defineTable({
        title: v.string(),
        description: v.optional(v.string()),
        startTime: v.number(),
        endTime: v.optional(v.number()),
        status: v.string(),
        streamCallId: v.string(),
        candidateId: v.string(),
        interviewerIds: v.array(v.string()),
    })
        .index("by_candidate_id", ["candidateId"])
        .index("by_stream_call_id", ["streamCallId"]),

    comments: defineTable({
        content: v.string(),
        rating: v.number(),
        interviewerId: v.string(),
        interviewId: v.id("interviews"),
    }).index("by_interview_id", ["interviewId"]),

    aiInterviews: defineTable({
        role: v.string(),
        type: v.string(),
        level: v.string(),
        techstack: v.array(v.string()),
        questions: v.array(v.string()),
        candidateId: v.string(),
        coverImage: v.string(),
    }).index("by_candidate_id", ["candidateId"]),

    feedbacks: defineTable({
        interviewId: v.string(),
        totalScore: v.number(),
        categoryScores: v.array(
            v.object({
                name: v.string(),
                score: v.number(),
                comment: v.string(),
            })
        ),
        strengths: v.array(v.string()),
        areasForImprovement: v.array(v.string()),
        finalAssessment: v.string(),
    }).index("by_interview_id", ["interviewId"]),
});
