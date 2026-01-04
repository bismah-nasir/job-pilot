import { QuickActionType } from "@/constants";
import { Card } from "./ui/card";

function ActionCard({
    action,
    onClick,
}: {
    action: QuickActionType;
    onClick: () => void;
}) {
    return (
        // <Card
        //     className={`group relative overflow-hidden hover:border-app-purple-600/50 transition-all duration-300 hover:shadow-lg cursor-pointer`}
        //     onClick={onClick}>
        //     {/* ACTION GRADIENT */}
        //     <div
        //         className={`absolute inset-0 bg-linear-to-br ${action.gradient} opacity-100 group-hover:opacity-500 transition-opacity`}
        //     />

        //     {/* ACTION CONTENT WRAPPER */}
        //     <div className="relative p-6 size-full">
        //         <div className="space-y-3">
        //             {/* ACTION ICON */}
        //             <div
        //                 className={`w-12 h-12 rounded-full flex items-center justify-center bg-${action.color}/10 group-hover:scale-110 transition-transform`}>
        //                 <action.icon
        //                     className={`h-6 w-6 text-${action.color}`}
        //                 />
        //             </div>

        //             {/* ACTION DETAILS */}
        //             <div className="space-y-1">
        //                 <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
        //                     {action.title}
        //                 </h3>
        //                 <p className="text-sm text-app-gray-600 dark:text-app-gray-400">
        //                     {action.description}
        //                 </p>
        //             </div>
        //         </div>
        //     </div>
        // </Card>
        <Card
            className={`group relative overflow-hidden ${action.borderColor} ${action.hoverBorderColor} transition-all duration-300 hover:shadow-lg cursor-pointer`}
            onClick={onClick}>
            {/* ACTION GRADIENT */}
            <div
                className={`absolute inset-0 bg-linear-to-br ${action.gradient} opacity-100 group-hover:opacity-80 transition-opacity`}
            />

            {/* ACTION CONTENT WRAPPER */}
            <div className="relative p-6 size-full">
                <div className="space-y-3">
                    {/* ACTION ICON */}
                    <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${action.bgColor} group-hover:scale-110 transition-transform`}>
                        <action.icon className={`h-6 w-6 ${action.color}`} />
                    </div>

                    {/* ACTION DETAILS */}
                    <div className="space-y-1">
                        <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                            {action.title}
                        </h3>
                        <p className="text-sm text-app-gray-600 dark:text-app-gray-400">
                            {action.description}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default ActionCard;
