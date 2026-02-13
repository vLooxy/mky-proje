import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";

interface FaqAccordionProps {
    title: string;
    subtitle: string;
    items: Array<{
        question: string;
        answer: string;
    }>;
}

export function FaqAccordion({ title, subtitle, items }: FaqAccordionProps) {
    return (
        <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <FadeIn direction="up">
                        <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">{subtitle}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">{title}</h2>
                    </FadeIn>
                </div>
                <div className="space-y-4">
                    {(items || []).map((item, i) => (
                        <FadeIn key={i} delay={i * 100} direction="up" >
                            <details className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 open:bg-white dark:open:bg-slate-800/80 open:shadow-lg transition-all duration-300">
                                <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-lg text-slate-900 dark:text-white marker:content-none select-none">
                                    {item.question}
                                    <span className="ml-4 transition-transform duration-300 group-open:rotate-180 text-primary">
                                        <span className="material-symbols-outlined">expand_more</span>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-300">
                                    <p className="leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">{item.answer}</p>
                                </div>
                            </details>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section >
    );
}
