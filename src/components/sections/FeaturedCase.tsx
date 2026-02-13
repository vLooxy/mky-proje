import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";

interface FeaturedCaseProps {
    title: string;
    text: string;
    image: string;
    category: string;
    buttonText: string;
}

export function FeaturedCase({ title, text, image, category, buttonText }: FeaturedCaseProps) {
    return (
        <section className="py-10 px-4 max-w-7xl mx-auto">
            <FadeIn direction="up" delay={300}>
                <div className="mt-8 overflow-hidden rounded-xl bg-white dark:bg-[#1a2634] shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col md:flex-row">
                        <div
                            className="h-64 md:h-auto md:w-2/5 bg-cover bg-center"
                            style={{ backgroundImage: `url("${image}")` }}
                        ></div>
                        <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
                            <div className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
                                {category}
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-[#111418] dark:text-white md:text-3xl">
                                {title}
                            </h3>
                            <p className="mb-6 text-gray-600 dark:text-gray-400">
                                {text}
                            </p>
                            <div>
                                <button className="rounded-lg border border-solid border-[#dce0e5] dark:border-gray-600 bg-transparent px-6 py-3 text-sm font-bold text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}
