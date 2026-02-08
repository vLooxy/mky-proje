import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

export interface HeroSectionProps {
    content?: {
        badge?: string;
        title_line1?: string;
        title_highlight?: string;
        description?: string;
        button_primary?: string;
        button_secondary?: string;
        backgroundImage?: string;
    };
}

export function HeroSection({ content }: HeroSectionProps) {
    const {
        badge = "ISO 9001 Sertifikalı Güvenlik",
        title_line1 = "MÜKEMMELİYET",
        title_highlight = "MÜHENDİSLİĞİ",
        description = "Modern endüstriler için riskleri minimize ediyor, verimliliği maksimize ediyoruz. Güvenlik bir seçenek değil, temeldir.",
        button_primary = "Danışmanlık Alın",
        button_secondary = "Hizmetlerimiz",
        backgroundImage = "https://images.pexels.com/photos/1038935/pexels-photo-1038935.jpeg"
    } = content || {};

    return (
        <section className="relative w-full h-auto min-h-[600px] md:min-h-[750px] flex flex-col justify-start overflow-hidden bg-[#0A1018] pt-40 md:pt-48 pb-24 md:pb-32">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: `url("${backgroundImage}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A1018]/80 via-[#0A1018]/60 to-[#0A1018]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1018] via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                    <FadeIn delay={100} direction="left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">
                                {badge}
                            </span>
                        </div>
                    </FadeIn>

                    <FadeIn delay={300} direction="up">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6 md:mb-8">
                            {title_line1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                {title_highlight}
                            </span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={500} direction="up">
                        <p className="text-lg md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mb-8 md:mb-10 border-l-2 border-blue-500/30 pl-4 md:pl-6">
                            {description}
                        </p>
                    </FadeIn>

                    <FadeIn delay={700} direction="up">
                        <div className="flex flex-wrap gap-5">
                            <Link
                                href="/iletisim"
                                className="group relative px-8 py-4 bg-primary hover:bg-blue-600 rounded-lg overflow-hidden transition-all shadow-lg hover:shadow-blue-500/25"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                <span className="relative text-white font-bold flex items-center gap-2">
                                    {button_primary}
                                    <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                                </span>
                            </Link>

                            <Link
                                href="/hizmetlerimiz"
                                className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg backdrop-blur-sm transition-all"
                            >
                                <span className="text-white font-medium flex items-center gap-2">
                                    {button_secondary}
                                    <span className="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100 transition-opacity">grid_view</span>
                                </span>
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Decorative Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white/20">
                <span className="material-symbols-outlined text-4xl">keyboard_arrow_down</span>
            </div>
        </section>
    );
}
