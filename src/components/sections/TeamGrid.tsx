import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";

interface TeamGridProps {
    title: string;
    subtitle: string;
    items: Array<{
        name: string;
        role: string;
        desc: string;
        image: string;
    }>;
}

export function TeamGrid({ title, subtitle, items }: TeamGridProps) {
    return (
        <section className="w-full py-20 bg-white dark:bg-[#1a2632]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn direction="up">
                    <div className="mb-12 md:mb-16 flex justify-between items-end">
                        <div>
                            <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">{title}</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">{subtitle}</h2>
                        </div>
                        <div className="hidden md:block">
                            <Link className="text-primary font-bold flex items-center gap-2 hover:underline" href="/">
                                Tüm Ekibi Gör <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(items || []).map((member, i) => (
                        <FadeIn key={i} delay={i * 100} direction="up" >
                            <div className="group bg-background-light dark:bg-background-dark rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                <div className="h-80 overflow-hidden relative">
                                    <div className="w-full h-full bg-cover bg-top group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${member.image}')` }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                                    <p className="text-primary font-medium text-sm mb-4">{member.role}</p>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{member.desc}</p>
                                    <div className="flex gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <a className="text-slate-900 dark:text-white hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
