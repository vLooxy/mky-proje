"use client";

import { FadeIn } from "@/components/ui/FadeIn";

export interface HomeModernHeroProps {
    smallTitle?: string;
    titleLine1?: string;
    titleLine2?: string;
    titleLine3?: string;
    description?: string;
}

export function HomeModernHero({
    smallTitle = "MKY GRUP",
    titleLine1 = "GELECEK",
    titleLine2 = "İÇİN",
    titleLine3 = "GÜVENLİK",
    description = "Sadece yapıları sağlamlaştırmıyoruz; yarının endüstriyel standartlarını ve çalışma kültürünü inşa ediyoruz."
}: HomeModernHeroProps) {
    return (
        <section className="relative w-full h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden bg-[#F0F4F8] dark:bg-[#0B1120] pt-32">
            <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
            </div>
            <div className="z-10 text-center relative mix-blend-multiply dark:mix-blend-normal">
                <FadeIn delay={100} direction="up">
                    <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] text-primary uppercase mb-4">
                        {smallTitle}
                    </h2>
                </FadeIn>
                <FadeIn delay={300} direction="up">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                        {titleLine1}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">{titleLine2}</span><br />
                        {titleLine3}
                    </h1>
                </FadeIn>
                <FadeIn delay={500} direction="up">
                    <p className="mt-8 text-lg max-w-2xl mx-auto text-slate-600 dark:text-slate-400 font-medium">
                        {description}
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
