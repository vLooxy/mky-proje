import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";

interface StatsSectionVariantProps {
    items: Array<{
        icon: string;
        value: string;
        label: string;
    }>;
}

export function StatsSectionVariant({ items }: StatsSectionVariantProps) {
    return (
        <section className="relative z-20 -mt-16 pb-16 px-4">
            <FadeIn direction="up" delay={600} className="w-full max-w-7xl mx-auto">
                <div className="bg-white dark:bg-[#1a2634] rounded-2xl shadow-xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-x-0 relative">
                    {(items || []).map((stat, i) => (
                        <div key={i} className="relative flex flex-col items-center text-center px-4 md:px-8 group">
                            {/* Divider (Desktop Only) */}
                            {i < (items || []).length - 1 && (
                                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gray-100 dark:bg-gray-700 pointer-events-none" />
                            )}
                            <div className="mb-2 text-primary">
                                <span className="material-symbols-outlined text-4xl">{stat.icon}</span>
                            </div>
                            <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </FadeIn>
        </section>
    );
}
