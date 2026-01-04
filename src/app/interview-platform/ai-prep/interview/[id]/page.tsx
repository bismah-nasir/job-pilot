import InterviewCall from "@/components/ai/InterviewCall";

interface RouteParams {
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string, string>>;
}

const Page = async ({ params }: RouteParams) => {
    const { id } = await params;

    return <InterviewCall id={id} />;
};

export default Page;
