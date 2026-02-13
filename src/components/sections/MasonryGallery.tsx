import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";

interface MasonryGalleryProps {
    title: string;
    description: string;
    images: string[];
}

export function MasonryGallery({ title, description, images }: MasonryGalleryProps) {
    return (
        <section className="py-24 bg-background-light dark:bg-black">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="md:w-2/3">
                        <FadeIn direction="up">
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">{title}</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">{description}</p>
                        </FadeIn>
                    </div>
                </div>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {(images || []).map((img, i) => (
                        <FadeIn key={i} delay={i * 50} direction="up">
                            <div className="break-inside-avoid rounded-2xl overflow-hidden group relative cursor-zoom-in">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img} alt="" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg">visibility</span>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
