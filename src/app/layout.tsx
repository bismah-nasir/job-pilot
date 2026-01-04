import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "JobPilot",
    description: "Ace it with jobpilot",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ConvexClerkProvider>
            <html lang="en" className="scroll-smooth" suppressHydrationWarning>
                <body className={`${inter.variable} antialiased `}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem>
                        {children}
                    </ThemeProvider>
                    <Toaster />
                </body>
            </html>
        </ConvexClerkProvider>
    );
}
