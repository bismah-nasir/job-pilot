import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import AppNavbar from "@/components/AppNavbar";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* If Signed In show the navbar */}

            <SignedIn>
                <div className="min-h-screen bg-app-gray-50 dark:bg-app-gray-900 transition-colors duration-300 scroll-smooth">
                    <AppNavbar />
                    <main className="px-4 sm:px-6 lg:px-8">{children}</main>
                </div>
            </SignedIn>

            {/* If Signed out redirect to sign in page */}

            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
}

export default Layout;
