import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";

interface TrustLogosProps {
    title: string;
    items: Array<{
        icon: string;
        name: string;
    }>;
}

export function TrustLogos({ title, items }: TrustLogosProps) {
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
                        {(items || []).map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-400" >
                                <span className="material-symbols-outlined">{item.icon}</span> {item.name}
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
