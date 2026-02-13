import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";

interface TestimonialsSliderProps {
    title: string;
    items: Array<{
        image: string;
        name: string;
        role: string;
        quote: string;
    }>;
}

export function TestimonialsSlider({ title, items }: TestimonialsSliderProps) {
    return (
        <section className="py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <FadeIn direction="up">
                        <span className="w-12 h-1 bg-primary block mx-auto mb-6 rounded-full"></span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">{title}</h2>
                    </FadeIn>
                </div>
                <div className="flex gap-8 overflow-x-auto pb-12 px-4 snap-x scrollbar-hide">
                    {(items || []).map((item, i) => (
                        <div key={i} className="min-w-[350px] md:min-w-[400px] bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl snap-center relative" >
                            <div className="text-6xl text-primary/20 font-serif absolute top-6 right-8">&quot;</div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-slate-200 bg-cover bg-center border-2 border-white dark:border-slate-700 shadow-md" style={{ backgroundImage: `url(${item.image})` }}></div>
                                <div>
                                    <div className="font-bold text-lg text-slate-900 dark:text-white">{item.name}</div>
                                    <div className="text-sm text-primary font-medium">{item.role}</div>
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 italic text-lg leading-relaxed relative z-10">
                                {item.quote}
                            </p>
                            <div className="flex gap-1 mt-6 text-yellow-500">
                                {[1, 2, 3, 4, 5].map(star => <span key={star} className="material-symbols-outlined text-sm fill-current">star</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}
