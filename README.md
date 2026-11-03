# JobPilot

AI-powered interview preparation and live interview platform.

- **Candidates** practise with an AI voice interviewer (VAPI) and get scored feedback (Google Gemini), and join scheduled video interviews.
- **Interviewers** schedule interviews, run live video calls with a shared code editor (Stream), and rate / pass / fail candidates.

## Tech stack

| Part | Service |
| --- | --- |
| App | Next.js 16 (App Router), React 19, Tailwind CSS 4 |
| Auth | Clerk |
| Database & backend functions | Convex (`convex/` folder) |
| Video calls & recordings | Stream Video |
| AI voice interviewer | VAPI |
| Question generation & feedback | Google Gemini via the Vercel AI SDK |

## Getting started

1. Install dependencies

    ```bash
    npm install
    ```

2. Create your env file and fill in the keys (each key has a link to where you get it):

    ```bash
    cp .env.example .env.local
    ```

3. Start Convex (pushes the `convex/` functions to your **dev** deployment and keeps them in sync):

    ```bash
    npx convex dev
    ```

4. In a second terminal, start Next.js:

    ```bash
    npm run dev
    ```

    Open the URL it prints (http://localhost:3000 by default; use `npm run dev -- -p 3001` if that port is taken).

### Environment variables

`.env.local` (Next.js) — see [.env.example](.env.example) for the full list.

| Variable | Used for |
| --- | --- |
| `GEMINI_MODEL` | Gemini model for questions **and** feedback. Change it here only — no code edits. |
| `GEMINI_FALLBACK_MODEL` | Used automatically when the main model is overloaded ("high demand"). |
| `NEXT_PUBLIC_VOICE_INTERVIEW_ENABLED` | `true` turns VAPI voice interviews back on; otherwise candidates get the written interview. |

Convex dashboard → Settings → Environment Variables (set for **each** deployment, dev and prod):

| Variable | Used for |
| --- | --- |
| `CLERK_WEBHOOK_SECRET` | Verifies the Clerk webhook (`/clerk-webhook`) that syncs users into Convex |
| `CLERK_JWT_ISSUER_DOMAIN` | Clerk "Frontend API URL", no trailing slash (e.g. `https://xxx.clerk.accounts.dev`) |

In Clerk, add a webhook pointing to `https://<your-deployment>.convex.site/clerk-webhook` with the events `user.created`, `user.updated` and `user.deleted`.

## Roles & approving interviewers

- Everyone who signs up is a **candidate**.
- The **"… as Interviewer"** buttons on the landing page send people to a confirmation page. If they request access, their user gets `interviewerRequest: "pending"` and they only see a "waiting for verification" screen — no other access.
- **To approve:** Convex dashboard → Data → `users` → set `role` to `interviewer`. Their screen unlocks automatically.
- **To reject:** delete the `interviewerRequest` field (they become a normal candidate again).

## Deploying

The app (`src/`) runs on Vercel; the `convex/` functions run on **Convex**, not Vercel. Deploy both together or they get out of sync. The simplest setup is to set the Vercel build command to:

```bash
npx convex deploy --cmd 'npm run build'
```

and add `CONVEX_DEPLOY_KEY` (Convex dashboard → production deployment → Settings) to the Vercel environment variables.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run typecheck` | Type-check the app and the Convex functions |
