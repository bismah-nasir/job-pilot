import { LoaderIcon } from "lucide-react";

function LoaderUI() {
    return (
        <div className="h-[calc(100vh-4rem-1px)] flex items-center justify-center">
            <LoaderIcon className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
        </div>
    );
}

export default LoaderUI;
