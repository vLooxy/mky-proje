import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";

interface ModernStatsProps {
    items: Array<{
        type: 'circle' | 'bar' | 'text';
        value: number | string;
        suffix?: string;
        label: string;
    }>;
}

export function ModernStats({ items }: ModernStatsProps) {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {(items || []).map((item, i) => (
                        <FadeIn key={i} delay={i * 150} direction="up" >
                            <div className="flex flex-col items-center">
                                {item.type === 'circle' ? (
                                    <div className="relative mb-6">
                                        <svg className="size-32 transform -rotate-90">
                                            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                                            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-primary" strokeDasharray={2 * Math.PI * 60} strokeDashoffset={2 * Math.PI * 60 * (1 - Number(item.value) / 100)} />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                                            {item.value}<span className="text-sm align-top mt-1">{item.suffix}</span>
                                        </div>
                                    </div>
                                ) : item.type === 'bar' ? (
                                    <div className="w-full text-center mb-6 px-4">
                                        <div className="text-5xl font-black text-blue-400 mb-4">{item.value}{item.suffix}</div>
                                        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" style={{ width: `${item.value}%` }}></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center mb-6">
                                        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-lg">
                                            {item.value}{item.suffix}
                                        </div>
                                    </div>
                                )}
                                <div className="text-sm uppercase tracking-[0.2em] font-bold text-slate-400">{item.label}</div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section >
    );
}
