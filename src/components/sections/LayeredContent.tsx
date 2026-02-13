import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";

interface LayeredContentProps {
    reverse?: boolean;
    bgText?: string;
    image: string;
    number?: string;
    category?: string;
    titlePart1: string;
    titlePart2: string;
    description: string;
    list?: string[];
    stats?: Array<{ value: string; label: string }>;
}

export function LayeredContent({
    reverse,
    bgText,
    image,
    number,
    category,
    titlePart1,
    titlePart2,
    description,
    list,
    stats
}: LayeredContentProps) {
    return (
        <section className={`relative w-full py-32 px-4 md:px-8 ${reverse ? 'bg-slate-900 dark:bg-black text-white' : 'bg-[#F0F4F8] dark:bg-[#0B1120]'}`}>
            <div className="max-w-7xl mx-auto relative">
                {bgText && (
                    <div className={`absolute ${reverse ? '-bottom-20 -right-10 md:right-0 text-white/5' : '-top-20 -left-10 md:left-0 text-slate-200 dark:text-slate-800/30'} text-[10rem] md:text-[15rem] font-black leading-none select-none z-0 opacity-50`}>
                        {bgText}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                    {/* Image Layer */}
                    <div className={`md:col-span-7 h-[500px] md:h-[600px] relative ${reverse ? 'md:order-2 md:-ml-12' : ''}`}>
                        <FadeIn direction={reverse ? "left" : "right"} className="w-full h-full">
                            <div className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 ease-out ${reverse ? 'bg-[#0B1120] -rotate-2 md:rotate-3 hover:rotate-0' : 'bg-slate-900 md:rotate-2 hover:rotate-0'}`}>
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }}>
                                    <div className={`absolute inset-0 ${reverse ? 'bg-blue-900/40 mix-blend-multiply' : 'bg-gradient-to-t from-slate-900 to-transparent opacity-60 mix-blend-overlay'}`} />
                                </div>
                                {/* Badge/Number */}
                                {number && !reverse && (
                                    <div className="absolute bottom-10 left-10 p-4 border-l-4 border-primary">
                                        <div className="text-white text-4xl font-bold">{number}</div>
                                        <div className="text-slate-300 uppercase tracking-widest text-sm">{category}</div>
                                    </div>
                                )}
                                {reverse && (
                                    <div className="absolute top-10 right-10 z-20 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                                        <span className="material-symbols-outlined text-4xl text-primary">public</span>
                                    </div>
                                )}
                            </div>
                        </FadeIn>
                    </div>

                    {/* Content Layer */}
                    <div className={`md:col-span-5 ${reverse ? 'md:order-1 md:pl-4' : 'md:-ml-24 mt-8 md:mt-0'}`}>
                        <FadeIn direction={reverse ? "right" : "left"} delay={200}>
                            <div className={!reverse ? "bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800" : "relative z-20"}>
                                <h3 className={`text-3xl md:text-5xl font-bold mb-6 ${!reverse ? "text-slate-900 dark:text-white" : ""}`}>
                                    {titlePart1} <span className={!reverse ? "text-primary" : "text-blue-400"}>{titlePart2}</span>
                                </h3>
                                <p className={`text-lg leading-relaxed mb-6 ${!reverse ? "text-slate-600 dark:text-slate-400" : "text-slate-400"}`}>
                                    {description}
                                </p>

                                {/* List */}
                                {list && list.length > 0 && (
                                    <ul className="space-y-4">
                                        {list.map((item, i) => (
                                            <li key={i} className={`flex items-center gap-4 font-medium ${!reverse ? "text-slate-700 dark:text-slate-300" : ""}`}>
                                                <span className="w-2 h-2 bg-primary rounded-full" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Stats (for Vision) */}
                                {stats && stats.length > 0 && (
                                    <div className="flex gap-4 mt-8">
                                        {stats.map((stat, i) => (
                                            <div key={i} className={`p-4 rounded-xl ${!reverse ? 'bg-slate-50 dark:bg-white/5' : 'bg-white/5 border border-white/10 backdrop-blur-sm'}`}>
                                                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                                <div className={`text-sm ${!reverse ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
