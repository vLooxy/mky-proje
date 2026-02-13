"use client";

import { FadeIn } from "@/components/ui/FadeIn";

export interface AboutPurposeProps {
    title?: string;
    subtitle?: string;
    description?: string;
    visionTitle?: string;
    visionDesc?: string;
    missionTitle?: string;
    missionDesc?: string;
}

export function AboutPurpose({
    title = "Endüstri Standartlarını İleriye Taşıyoruz",
    subtitle = "Amacımız",
    description = "Sadece yönetmelikleri takip etmiyoruz; inovasyon ve titiz mühendislik uygulamalarıyla endüstriyel güvenliğin geleceğini şekillendiriyoruz.",
    visionTitle = "Vizyonumuz",
    visionDesc = "Güvenlik ve mühendislik bütünlüğünde küresel referans noktası olmak; endüstriyel ilerleme ve insan güvenliğinin mükemmel bir uyum içinde olduğu, kalite veya yaşamdan ödün verilmeyen bir dünya yaratmak.",
    missionTitle = "Misyonumuz",
    missionDesc = "Endüstrileri hassas mühendislik çözümleri ve kapsamlı güvenlik stratejileriyle güçlendirmek; riski en aza indirmek, verimliliği maksimize etmek ve her çalışanın her gün evine güvenle dönmesini sağlamak."
}: AboutPurposeProps) {
    return (
        <section className="w-full py-20 bg-white dark:bg-[#15202b]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <FadeIn direction="up">
                        <span
                            className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block"
                            dangerouslySetInnerHTML={{ __html: subtitle }}
                        />
                        <h2
                            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4"
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                        <div
                            className="text-slate-600 dark:text-slate-400"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    </FadeIn>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <FadeIn direction="right" delay={200} className="h-full">
                        <div className="relative bg-background-light dark:bg-background-dark p-10 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow h-full">
                            <div className="absolute top-0 right-0 p-10 opacity-5 text-primary">
                                <span className="material-symbols-outlined text-9xl">
                                    visibility
                                </span>
                            </div>
                            <div className="relative z-10">
                                <div className="size-16 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-6">
                                    <span className="material-symbols-outlined text-3xl">
                                        visibility
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    {visionTitle}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                    {visionDesc}
                                </p>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn direction="left" delay={400} className="h-full">
                        <div className="relative bg-primary text-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden h-full">
                            <div className="absolute top-0 right-0 p-10 opacity-10 text-white">
                                <span className="material-symbols-outlined text-9xl">
                                    rocket_launch
                                </span>
                            </div>
                            <div className="relative z-10">
                                <div className="size-16 rounded-xl bg-white/20 flex items-center justify-center text-white mb-6">
                                    <span className="material-symbols-outlined text-3xl">
                                        rocket_launch
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {missionTitle}
                                </h3>
                                <p className="text-blue-100 text-lg leading-relaxed">
                                    {missionDesc}
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
