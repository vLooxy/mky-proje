import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";

interface ValuesGridProps {
    title: string;
    subtitle: string;
    items: Array<{
        title: string;
        desc: string;
        icon?: string;
    }>;
}

export function ValuesGrid({ title, subtitle, items }: ValuesGridProps) {
    return (
        <section className="w-full py-32 bg-[#F0F4F8] dark:bg-[#0B1120]">
            <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-16">
                <FadeIn direction="up">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">{title}</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-2">{subtitle}</h2>
                </FadeIn>
            </div>
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(items || []).map((value, i) => (
                    <FadeIn key={i} delay={i * 100} direction="up" className="h-full">
                        <div className="group h-full bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-primary rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">{value.icon || 'star'}</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{value.title}</h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{value.desc}</p>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}
