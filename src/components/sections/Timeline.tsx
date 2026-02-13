import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";

interface TimelineProps {
    title: string;
    subtitle: string;
    items: Array<{
        year: string;
        title: string;
        desc: string;
    }>;
}

export function Timeline({ title, subtitle, items }: TimelineProps) {
    return (
        <section className="w-full py-20 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <FadeIn direction="up">
                        <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">{title}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">{subtitle}</h2>
                    </FadeIn>
                </div>
                <div className="relative">
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 transform md:-translate-x-1/2"></div>
                    <div className="space-y-12">
                        {(items || []).map((item, i) => {
                            const order = i % 2 === 0 ? 'left' : 'right';
                            return (
                                <FadeIn key={i} direction={order === "left" ? "right" : "left"}>
                                    <div className="relative flex flex-col md:flex-row items-start md:items-center w-full group">
                                        <div className={`w-full md:w-1/2 pl-20 md:pl-0 md:pr-16 md:text-right ${order === 'right' ? 'md:order-1' : ''}`}>
                                            {order === 'left' ? (
                                                <h3 className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors">{item.year}</h3>
                                            ) : (
                                                <>
                                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                                    <p className="text-slate-600 dark:text-slate-400 mt-2">{item.desc}</p>
                                                </>
                                            )}
                                        </div>
                                        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 size-4 bg-white dark:bg-slate-800 border-4 border-primary rounded-full z-10 shadow-[0_0_0_4px_rgba(37,99,235,0.2)]"></div>
                                        <div className={`w-full md:w-1/2 pl-20 md:pl-16 ${order === 'right' ? 'md:order-2' : ''}`}>
                                            {order === 'right' ? (
                                                <h3 className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors">{item.year}</h3>
                                            ) : (
                                                <>
                                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                                    <p className="text-slate-600 dark:text-slate-400 mt-2">{item.desc}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
