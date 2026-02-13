import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";

interface ProjectsSliderProps {
    title: string;
    subtitle: string;
    items: Array<{
        title: string;
        location: string;
        image: string;
    }>;
}

export function ProjectsSlider({ title, subtitle, items }: ProjectsSliderProps) {
    return (
        <section className="w-full py-20 bg-[#101922] overflow-hidden">
            <div className="max-w-[1920px] mx-auto min-h-[600px] flex flex-col lg:flex-row">
                {/* Left Content */}
                <div className="w-full lg:w-1/3 p-8 lg:p-16 flex flex-col justify-center relative z-10 bg-[#101922]">
                    <FadeIn direction="right">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/20">
                            {subtitle}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
                            {title}
                        </h2>
                        <div className="flex gap-4 mt-8">
                            <button className="w-12 h-12 rounded-full border border-slate-700 text-white hover:bg-white hover:text-black flex items-center justify-center transition-all">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <button className="w-12 h-12 rounded-full bg-primary text-white hover:bg-blue-600 flex items-center justify-center transition-all shadow-lg shadow-blue-900/50">
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </FadeIn>
                </div>
                {/* Slider Area */}
                <div className="w-full lg:w-2/3 relative h-[50vh] lg:h-auto">
                    <div className="flex h-full space-x-4 p-4 overflow-x-auto">
                        {(items || []).map((item, i) => (
                            <div key={i} className="relative min-w-[300px] md:min-w-[400px] h-[400px] rounded-xl overflow-hidden group inline-block mr-4" >
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${item.image})` }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8">
                                    <div className="text-blue-400 text-xs font-bold uppercase mb-2">{item.location}</div>
                                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
}
