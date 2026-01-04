"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useUserRole } from "@/hooks/useUserRole";
import { RiSparklingLine } from "react-icons/ri";

function DashboardBtn() {
    const { isCandidate, isLoading } = useUserRole();

    if (isCandidate || isLoading) {
        return null;
    }

    return (
        <Link href={"/interview-platform/dashboard"}>
            <Button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-105 border-2 border-app-purple-600 bg-app-purple-600 hover:bg-app-purple-700 hover:border-app-purple-700 text-app-white shadow-lg hover:shadow-xl px-4 py-2 text-sm">
                <RiSparklingLine className="size-5 flex items-center justify-center"></RiSparklingLine>
                Dashboard
            </Button>
        </Link>
    );
}

export default DashboardBtn;
