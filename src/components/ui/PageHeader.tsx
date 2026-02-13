"use client";

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";

type PageHeaderProps = {
    title: React.ReactNode;
    description?: string;
    image?: string;
    badge?: React.ReactNode;
    height?: string;
};

export function PageHeader({
    title,
    description,
    image,
    badge,
    height = "h-[60vh]",
}: PageHeaderProps) {
    return (
        <header className={`relative w-full overflow-hidden ${height} flex items-center pt-32`}>
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-slate-900/80 z-10"></div>
                {image && (
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${image}')` }}
                    ></div>
                )}
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl flex flex-col gap-6">
                    {badge && (
                        <FadeIn direction="up">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm w-fit">
                                {badge}
                            </div>
                        </FadeIn>
                    )}
                    <FadeIn direction="up" delay={100}>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight"
                            dangerouslySetInnerHTML={{ __html: String(title) }}
                        />
                    </FadeIn>
                    {description && (
                        <FadeIn direction="up" delay={200}>
                            <div
                                className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        </FadeIn>
                    )}
                </div>
            </div>
        </header>
    );
}
