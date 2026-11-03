"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const interviewFormSchema = z.object({
    interviewType: z.enum(["Technical", "Behavioural", "Mix"]),
    role: z
        .string()
        .min(2, "Role is required")
        .max(100, "Keep the role under 100 characters"),
    techStack: z
        .string()
        .min(2, "Tech stack is required")
        .max(300, "Keep the tech stack under 300 characters"),
    jobLevel: z.enum(["Junior", "Senior", "Staff"]),
});

type InterviewFormValues = z.infer<typeof interviewFormSchema>;

const InterviewForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    // Live "X left today" — the real check happens on the server
    const quota = useQuery(api.aiUsage.getAiQuota, { kind: "interview" });
    const limitReached = quota?.remaining === 0;
    const form = useForm<InterviewFormValues>({
        resolver: zodResolver(interviewFormSchema),
        defaultValues: {
            interviewType: "Technical",
            role: "",
            techStack: "",
            jobLevel: "Junior",
        },
    });

    const onSubmit = async (values: InterviewFormValues) => {
        setIsLoading(true);
        const formData = {
            type: values.interviewType,
            role: values.role,
            level: values.jobLevel,
            techstack: values.techStack,
        };
        try {
            // Relative URL works on localhost (any port) and on Vercel
            const response = await fetch("/api/create-ai-interview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.error || "Unable to create interview.");
            }
            toast.success("Interview created successfully");
            router.push("/interview-platform/ai-prep");
        } catch (error: unknown) {
            let errorMessage = "";
            if (
                error != null &&
                typeof error === "object" &&
                "message" in error
            ) {
                errorMessage = error.message as string;
            } else {
                errorMessage = "Unable to create interview.";
            }
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-fit lg:min-w-141.5 mx-auto mt-5 mb-10">
            <div
                className="
        flex flex-col gap-3 py-10 px-10 rounded-2xl
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        shadow-sm
      ">
                <h3 className="text-center text-2xl font-bold">
                    Create Your Interview
                </h3>

                <p className="text-center text-gray-600 dark:text-gray-300">
                    Customize your mock interview to suit your needs.
                </p>

                {quota && (
                    <p
                        className={`w-fit mx-auto text-center text-xs font-semibold rounded-full border px-3 py-1 ${
                            limitReached
                                ? "bg-app-red-100 text-app-red-700 border-app-red-400/40 dark:bg-app-red-900/30 dark:text-app-red-400 dark:border-app-red-900"
                                : "bg-app-purple-50 text-app-purple-700 border-app-purple-200 dark:bg-app-purple-900/20 dark:text-app-purple-300 dark:border-app-purple-800"
                        }`}>
                        {limitReached
                            ? `You've used all ${quota.perDay} AI interviews for today. Please come back later.`
                            : `${quota.remaining} of ${quota.perDay} AI interviews left today`}
                            {/* : `You can create ${quota.remaining} more AI interview${quota.remaining === 1 ? "" : "s"} today (limit ${quota.perDay}).`} */}
                    </p>
                )}

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6 mt-5 form">
                        <FormField
                            control={form.control}
                            name="interviewType"
                            label="What type of interview would you like to practice?"
                            type="select"
                            options={[
                                { label: "Technical", value: "Technical" },
                                { label: "Behavioural", value: "Behavioural" },
                                { label: "Mix", value: "Mix" },
                            ]}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            label="What role are you focusing on?"
                            placeholder="e.g. Frontend Developer"
                        />

                        <FormField
                            control={form.control}
                            name="techStack"
                            label="Which tech stack would you like to focus on?"
                            placeholder="e.g. React, Node.js, TypeScript"
                        />

                        <FormField
                            control={form.control}
                            name="jobLevel"
                            label="What is your job level?"
                            type="select"
                            options={[
                                { label: "Junior", value: "Junior" },
                                { label: "Senior", value: "Senior" },
                                { label: "Staff", value: "Staff" },
                            ]}
                        />

                        <Button
                            className="
              w-full min-h-10 rounded-full font-bold px-5 transition
              bg-app-purple-600 hover:bg-app-purple-700
              text-white
              dark:bg-app-purple-600 dark:hover:bg-app-purple-500
              shadow-sm
            "
                            type="submit"
                            disabled={isLoading || limitReached}>
                            {isLoading
                                ? "Creating Interview..."
                                : "Create Interview"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default InterviewForm;
