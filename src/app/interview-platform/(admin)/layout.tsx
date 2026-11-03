import InterviewerGuard from "@/components/InterviewerGuard";

function Layout({ children }: { children: React.ReactNode }) {
    return <InterviewerGuard>{children}</InterviewerGuard>;
}

export default Layout;
