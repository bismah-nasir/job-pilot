import { Clock, Code2, Calendar, Users } from "lucide-react";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export const INTERVIEW_CATEGORY = [
    { id: "upcoming", title: "Upcoming Interviews", variant: "outline" },
    { id: "completed", title: "Completed", variant: "secondary" },
    { id: "succeeded", title: "Succeeded", variant: "default" },
    { id: "failed", title: "Failed", variant: "destructive" },
] as const;

export const TIME_SLOTS = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
];

// export const QUICK_ACTIONS = [
//     {
//         icon: Code2,
//         title: "New Call",
//         description: "Start an instant call",
//         color: "app-green-500",
//         gradient: "from-app-green-500/10 via-app-green-500/5 to-transparent",
//     },
//     {
//         icon: Users,
//         title: "Join Interview",
//         description: "Enter via invitation link",
//         color: "app-purple-500",
//         gradient: "from-app-purple-500/10 via-purple-app-500/5 to-transparent",
//     },
//     {
//         icon: Calendar,
//         title: "Schedule",
//         description: "Plan upcoming interviews",
//         color: "app-blue-500",
//         gradient: "from-app-blue-500/10 via-app-blue-500/5 to-transparent",
//     },
//     {
//         icon: Clock,
//         title: "Recordings",
//         description: "Access past interviews",
//         color: "app-orange-500",
//         gradient: "from-app-orange-500/10 via-app-orange-500/5 to-transparent",
//     },
// ];

export const QUICK_ACTIONS = [
    {
        icon: Code2,
        title: "New Call",
        description: "Start an instant call",
        color: "text-app-green-500",
        bgColor: "bg-app-green-500/10",
        borderColor: "border-app-green-500",
        hoverBorderColor: "hover:border-app-green-500",
        gradient: "from-app-green-500/10 via-app-green-500/5 to-transparent",
    },
    {
        icon: Users,
        title: "Join Interview",
        description: "Enter via invitation link",
        color: "text-app-purple-500",
        bgColor: "bg-app-purple-500/10",
        borderColor: "border-app-purple-500",
        hoverBorderColor: "hover:border-app-purple-500",
        gradient: "from-app-purple-500/10 via-app-purple-500/5 to-transparent",
    },
    {
        icon: Calendar,
        title: "Schedule",
        description: "Plan upcoming interviews",
        color: "text-app-blue-500",
        bgColor: "bg-app-blue-500/10",
        borderColor: "border-app-blue-500",
        hoverBorderColor: "hover:border-app-blue-500",
        gradient: "from-app-blue-500/10 via-app-blue-500/5 to-transparent",
    },
    {
        icon: Clock,
        title: "Recordings",
        description: "Access past interviews",
        color: "text-app-orange-500",
        bgColor: "bg-app-orange-500/10",
        borderColor: "border-app-orange-500",
        hoverBorderColor: "hover:border-app-orange-500",
        gradient: "from-app-orange-500/10 via-app-orange-500/5 to-transparent",
    },
];

export const CODING_QUESTIONS: CodeQuestion[] = [
    {
        id: "two-sum",
        title: "Two Sum",
        description:
            "Given an array of integers `nums` and an integer `target`, return indices of the two numbers in the array such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]",
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
            },
        ],
        starterCode: {
            javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}`,
            python: `def two_sum(nums, target):
    # Write your solution here
    pass`,
            java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
        },
        constraints: [
            "2 ≤ nums.length ≤ 104",
            "-109 ≤ nums[i] ≤ 109",
            "-109 ≤ target ≤ 109",
            "Only one valid answer exists.",
        ],
    },
    {
        id: "reverse-string",
        title: "Reverse String",
        description:
            "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
        examples: [
            {
                input: 's = ["h","e","l","l","o"]',
                output: '["o","l","l","e","h"]',
            },
            {
                input: 's = ["H","a","n","n","a","h"]',
                output: '["h","a","n","n","a","H"]',
            },
        ],
        starterCode: {
            javascript: `function reverseString(s) {
  // Write your solution here
  
}`,
            python: `def reverse_string(s):
    # Write your solution here
    pass`,
            java: `class Solution {
    public void reverseString(char[] s) {
        // Write your solution here
        
    }
}`,
        },
    },
    {
        id: "palindrome-number",
        title: "Palindrome Number",
        description:
            "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.\n\nAn integer is a palindrome when it reads the same forward and backward.",
        examples: [
            {
                input: "x = 121",
                output: "true",
                explanation:
                    "121 reads as 121 from left to right and from right to left.",
            },
            {
                input: "x = -121",
                output: "false",
                explanation:
                    "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.",
            },
        ],
        starterCode: {
            javascript: `function isPalindrome(x) {
  // Write your solution here
  
}`,
            python: `def is_palindrome(x):
    # Write your solution here
    pass`,
            java: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your solution here
        
    }
}`,
        },
    },
];

export const LANGUAGES = [
    { id: "javascript", name: "JavaScript", icon: "/javascript.png" },
    { id: "python", name: "Python", icon: "/python.png" },
    { id: "java", name: "Java", icon: "/java.png" },
] as const;

export interface CodeQuestion {
    id: string;
    title: string;
    description: string;
    examples: Array<{
        input: string;
        output: string;
        explanation?: string;
    }>;
    starterCode: {
        javascript: string;
        python: string;
        java: string;
    };
    constraints?: string[];
}

export type QuickActionType = (typeof QUICK_ACTIONS)[number];

// AI Interview
export const interviewer: CreateAssistantDTO = {
    name: "Interviewer",
    firstMessage:
        "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en",
    },
    voice: {
        provider: "11labs",
        voiceId: "sarah",
        stability: 0.4,
        similarityBoost: 0.8,
        speed: 0.9,
        style: 0.5,
        useSpeakerBoost: true,
    },
    model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
            },
        ],
    },
};
