// Clerk issuer domain (Clerk dashboard → API Keys → "Frontend API URL"), no trailing slash.
// Set CLERK_JWT_ISSUER_DOMAIN per deployment in the Convex dashboard
// (Settings → Environment Variables) so dev and production can use different Clerk instances.
// Convex refuses to deploy if it is missing, so it can't silently break sign-in.
export default {
    providers: [
        {
            domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
            applicationID: "convex",
        },
    ],
};
