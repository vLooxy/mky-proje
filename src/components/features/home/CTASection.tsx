"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

export interface CTASectionProps {
    title?: string;
    text?: string;
    buttonText?: string;
    buttonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
}

export function CTASection({
    title,
    text,
    buttonText,
    buttonLink,
    secondaryButtonText = "Destek İletişim",
    secondaryButtonLink = "/iletisim"
}: CTASectionProps) {
    return (
        <section className="w-full bg-primary text-white py-12 md:py-20 px-6 lg:px-40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="mx-auto max-w-[960px] flex flex-col items-center text-center gap-8 relative z-10">
                <FadeIn direction="up">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                        {title || "Güvenlik standartlarınızı yükseltmeye hazır mısınız?"}
                    </h2>
                </FadeIn>
                <FadeIn direction="up" delay={100}>
                    <p className="text-lg md:text-xl text-blue-100 max-w-[600px]">
                        {text || "Proje gereksinimlerinizi görüşmek için sertifikalı mühendislerimizle bugün iletişime geçin."}
                    </p>
                </FadeIn>
                <FadeIn direction="up" delay={200}>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link href={buttonLink || "/iletisim"} className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors text-lg flex items-center justify-center shadow-lg">
                            {buttonText || "Teklif Al"}
                        </Link>
                        <Link href={secondaryButtonLink} className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-colors text-lg flex items-center justify-center">
                            {secondaryButtonText}
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
