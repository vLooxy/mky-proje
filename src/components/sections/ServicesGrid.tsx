import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";
import { ServiceCard } from '@/components/cards/ServiceCard';

interface ServicesGridProps {
    title: string;
    description: string;
    items: Array<{
        icon: string;
        title: string;
        desc: string;
    }>;
}

export function ServicesGrid({ title, description, items }: ServicesGridProps) {
    return (
        <section className="flex-1 bg-background-light dark:bg-background-dark py-16 px-4 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <FadeIn direction="up">
                        <h2 className="text-[#111418] dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                            {title}
                        </h2>
                    </FadeIn>
                    <FadeIn direction="up" delay={200}>
                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
                            {description}
                        </p>
                    </FadeIn>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {(items || []).map((item, i) => (
                        <FadeIn key={i} delay={100 * (i + 1)} direction="up" className="h-full" >
                            <ServiceCard
                                icon={item.icon}
                                title={item.title}
                                description={item.desc}
                            />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
