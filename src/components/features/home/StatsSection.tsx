"use client";

import { FadeIn } from "@/components/ui/FadeIn";

interface StatItem {
    value: string;
    label: string;
    subLabel?: string;
    icon: string;
}

export interface StatsSectionProps {
    items?: StatItem[];
}

export function StatsSection({ items }: StatsSectionProps) {
    const defaultItems: StatItem[] = [
        { value: "Sıfır", label: "Kaza", subLabel: "Güvenlik Kaydı", icon: "verified_user" },
        { value: "20+", label: "Yıl", subLabel: "Deneyim", icon: "history" },
        { value: "9001", label: "& 45001", subLabel: "ISO Sertifikalı", icon: "gavel" },
        { value: "50+", label: "Mühendis", subLabel: "Uzmanlar", icon: "group" },
    ];

    const displayItems = items || defaultItems;

    return (
        <section className="w-full bg-surface-light dark:bg-surface-dark border-b border-[#f0f2f4] dark:border-gray-800 transition-colors duration-200">
            <div className="px-6 lg:px-40 py-12 md:py-16">
                <div className="mx-auto max-w-[1200px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayItems.map((item, index) => (
                            <FadeIn key={index} delay={index * 100} direction="up" className="h-full">
                                <div className="flex flex-col gap-1 p-4 rounded-lg bg-background-light dark:bg-background-dark/50 border border-transparent dark:border-gray-700 h-full">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-primary">
                                            {item.icon}
                                        </span>
                                        <p className="text-text-main dark:text-white text-sm font-medium leading-normal opacity-70">
                                            {item.subLabel}
                                        </p>
                                    </div>
                                    <p className="text-text-main dark:text-white tracking-tight text-3xl font-black leading-tight">
                                        {item.value}{" "}
                                        <span className="text-base font-normal text-gray-500">
                                            {item.label}
                                        </span>
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
