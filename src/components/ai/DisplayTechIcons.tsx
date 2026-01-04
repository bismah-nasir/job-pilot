import { cn, getTechLogos } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface TechIconProps {
    techStack: string[];
}

const DisplayTechIcons = ({ techStack }: TechIconProps) => {
    const [techIcons, setTechIcons] = useState<
        {
            tech: string;
            url: string;
        }[]
    >([]);

    useEffect(() => {
        getTechLogos(techStack)
            .then((data) => {
                setTechIcons(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="flex flex-row items-center">
            {techIcons.slice(0, 3).map(({ tech, url }, index) => (
                <div
                    key={tech}
                    className={cn(
                        "relative size-9 rounded-full",
                        "flex items-center justify-center",
                        "bg-gray-100 dark:bg-gray-800",
                        "border border-gray-200 dark:border-gray-700",
                        "shadow-sm",
                        "transition-transform duration-200 hover:scale-105",
                        index >= 1 && "-ml-3"
                    )}
                    style={{ zIndex: 10 - index }}>
                    {/* Inner wrapper ensures perfect centering */}
                    <div className="size-5 flex items-center justify-center">
                        <Image
                            src={url}
                            alt={tech}
                            width={20}
                            height={20}
                            className="object-contain"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DisplayTechIcons;
