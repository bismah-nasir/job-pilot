"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

const interviewFormSchema = z.object({
    interviewType: z.enum(["Technical", "Behavioural", "Mix"]),
    role: z.string().min(2, "Role is required"),
    techStack: z.string().min(2, "Tech stack is required"),
    jobLevel: z.enum(["Junior", "Senior", "Staff"]),
});

type InterviewFormValues = z.infer<typeof interviewFormSchema>;

const InterviewForm = () => {
    const { user } = useUser();
    const userId = user?.id;
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
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
            candidateId: userId,
        };
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/create-ai-interview`,
                {
                    method: "POST",
                    body: JSON.stringify(formData),
                }
            );
            if (!response.ok) {
                throw new Error("Unable to create interview.");
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
        console.log("Interview form submitted:", formData);
    };

    return (
        <div className="w-fit lg:min-w-141.5 mx-auto mt-5">
            <div
                className="
        flex flex-col gap-5 py-10 px-10 rounded-2xl
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        shadow-sm
      ">
                <h3 className="text-center text-2xl font-bold">
                    Create Your Interview
                </h3>

                <p className="text-gray-600 dark:text-gray-300">
                    Customize your mock inteview to sit your needs.
                </p>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6 mt-3 form">
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
                            placeholder="Select your role"
                        />

                        <FormField
                            control={form.control}
                            name="techStack"
                            label="Which tech stack would you like to focus on?"
                            placeholder="Select your preferred tech stack"
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
              bg-app-purple-500 hover:bg-app-purple-600
              text-white
              dark:bg-app-purple-400 dark:hover:bg-app-purple-500
              shadow-sm
            "
                            type="submit"
                            disabled={isLoading}>
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
