"use client";

import { FadeIn } from "@/components/ui/FadeIn";

interface TrustItem {
    name: string;
    icon: string;
}

export interface TrustIndicatorsProps {
    title?: string;
    items?: TrustItem[];
}

export function TrustIndicators({
    title = "Dünya çapında endüstri liderleri tarafından güvenilmektedir",
    items
}: TrustIndicatorsProps) {
    const defaultItems: TrustItem[] = [
        { name: "ISO 9001", icon: "verified_user" },
        { name: "OSHA Compliant", icon: "shield" },
        { name: "LEED Certified", icon: "eco" },
        { name: "SafeWork", icon: "security" }
    ];

    const displayItems = items || defaultItems;

    return (
        <div className="w-full border-b border-[#f0f2f4] dark:border-[#2a3441] bg-white dark:bg-[#15202b] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-6">
                <FadeIn direction="up">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                        {title}
                    </p>
                </FadeIn>
                <FadeIn direction="up" delay={200}>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {displayItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-400">
                                <span className="material-symbols-outlined">{item.icon}</span>
                                {item.name}
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
