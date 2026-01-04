import { clsx, type ClassValue } from "clsx";
import {
    addHours,
    intervalToDuration,
    isAfter,
    isBefore,
    isWithinInterval,
} from "date-fns";
import { twMerge } from "tailwind-merge";
import { Doc } from "../../convex/_generated/dataModel";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Interview = Doc<"interviews">;
type User = Doc<"users">;

export const groupInterviews = (interviews: Interview[]) => {
    if (!interviews) return {};

    return interviews.reduce((acc: any, interview: Interview) => {
        const date = new Date(interview.startTime);
        const now = new Date();

        if (interview.status === "succeeded") {
            acc.succeeded = [...(acc.succeeded || []), interview];
        } else if (interview.status === "failed") {
            acc.failed = [...(acc.failed || []), interview];
        } else if (isBefore(date, now)) {
            acc.completed = [...(acc.completed || []), interview];
        } else if (isAfter(date, now)) {
            acc.upcoming = [...(acc.upcoming || []), interview];
        }

        return acc;
    }, {});
};

export const getCandidateInfo = (users: User[], candidateId: string) => {
    const candidate = users?.find((user) => user.clerkId === candidateId);
    return {
        name: candidate?.name || "Unknown Candidate",
        image: candidate?.image || "",
        initials:
            candidate?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "UC",
    };
};

export const getInterviewerInfo = (users: User[], interviewerId: string) => {
    const interviewer = users?.find((user) => user.clerkId === interviewerId);
    return {
        name: interviewer?.name || "Unknown Interviewer",
        image: interviewer?.image,
        initials:
            interviewer?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "UI",
    };
};

export const calculateRecordingDuration = (
    startTime: string,
    endTime: string
) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const duration = intervalToDuration({ start, end });

    if (duration.hours && duration.hours > 0) {
        return `${duration.hours}:${String(duration.minutes).padStart(2, "0")}:${String(
            duration.seconds
        ).padStart(2, "0")}`;
    }

    if (duration.minutes && duration.minutes > 0) {
        return `${duration.minutes}:${String(duration.seconds).padStart(2, "0")}`;
    }

    return `${duration.seconds} seconds`;
};

export const getMeetingStatus = (interview: Interview) => {
    const now = new Date();
    const interviewStartTime = interview.startTime;
    const endTime = addHours(interviewStartTime, 1);

    if (
        interview.status === "completed" ||
        interview.status === "failed" ||
        interview.status === "succeeded"
    )
        return "completed";
    if (isWithinInterval(now, { start: interviewStartTime, end: endTime }))
        return "live";
    if (isBefore(now, interviewStartTime)) return "upcoming";
    return "completed";
};

// AI Mock Interview

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];


const normalizeTechName = (tech: string) => {
    const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
    return mappings[key as keyof typeof mappings];
};

const checkIconExists = async (url: string) => {
    try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok; // Returns true if the icon exists
    } catch {
        return false;
    }
};

export const getTechLogos = async (techArray: string[]) => {
    const logoURLs = techArray.map((tech) => {
        const normalized = normalizeTechName(tech);
        return {
            tech,
            url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
        };
    });

    const results = await Promise.all(
        logoURLs.map(async ({ tech, url }) => ({
            tech,
            url: (await checkIconExists(url)) ? url : "/tech.svg",
        }))
    );

    return results;
};

export const getRandomInterviewCover = () => {
    const randomIndex = Math.floor(Math.random() * interviewCovers.length);
    return `/covers${interviewCovers[randomIndex]}`;
};