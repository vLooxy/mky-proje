"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

interface ServiceItem {
    title: string;
    description: string;
    icon: string;
    link?: string;
}

export interface ServicesSectionProps {
    subtitle?: string;
    title?: string;
    description?: string;
    items?: ServiceItem[];
}

export function ServicesSection({ subtitle, title, description, items }: ServicesSectionProps) {
    const defaultItems: ServiceItem[] = [
        {
            title: "İSG Danışmanlığı",
            description: "Kapsamlı risk değerlendirmeleri, yerel düzenlemelere uygunluk denetimleri ve iş gücünüz için özel güvenlik eğitim programları.",
            icon: "safety_check",
            link: "/hizmetlerimiz"
        },
        {
            title: "Yapısal Mühendislik",
            description: "Endüstriyel tesisler için gelişmiş tasarım analizi, yapısal bütünlük testleri ve tam kapsamlı proje yönetimi.",
            icon: "precision_manufacturing",
            link: "/hizmetlerimiz"
        },
        {
            title: "Çevre Hizmetleri",
            description: "Çevresel etki değerlendirmeleri (ÇED), sürdürülebilirlik planlaması ve atık yönetimi optimizasyon stratejileri.",
            icon: "eco",
            link: "/hizmetlerimiz"
        }
    ];

    const displayItems = items || defaultItems;

    return (
        <section className="flex flex-col w-full py-12 md:py-16 bg-white dark:bg-background-dark transition-colors duration-200">
            <div className="px-6 lg:px-40 flex justify-center">
                <div className="flex flex-col max-w-[1200px] flex-1">
                    <div className="flex flex-col gap-10 md:gap-12 @container">
                        <div className="flex flex-col gap-4 text-center md:text-left">
                            <FadeIn direction="up">
                                <h4 className="text-primary font-bold uppercase tracking-widest text-sm">
                                    {subtitle || "Hizmetlerimiz"}
                                </h4>
                            </FadeIn>
                            <FadeIn direction="up" delay={100}>
                                <h1 className="text-text-main dark:text-white tracking-tight text-3xl md:text-4xl font-bold leading-tight max-w-[720px]">
                                    {title || "Endüstriyel güvenlik ve yapısal bütünlük için kapsamlı uzmanlık."}
                                </h1>
                            </FadeIn>
                            <FadeIn direction="up" delay={200}>
                                <p className="text-text-light dark:text-gray-400 text-lg font-normal leading-normal max-w-[720px]">
                                    {description || "Operasyonlarınızın sorunsuz ve güvenli bir şekilde yürümesi için teknik hassasiyeti mevzuat bilgisiyle birleştiriyoruz."}
                                </p>
                            </FadeIn>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {displayItems.map((item, index) => (
                                <FadeIn key={index} direction="up" delay={300 + (index * 100)} className="h-full">
                                    <div className="group flex flex-1 flex-col gap-4 rounded-xl border border-[#dbe0e6] dark:border-gray-700 bg-surface-light dark:bg-surface-dark p-8 transition-all hover:shadow-lg hover:border-primary/50 h-full">
                                        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-3xl">
                                                {item.icon}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-text-main dark:text-white text-xl font-bold leading-tight">
                                                {item.title}
                                            </h2>
                                            <p className="text-text-light dark:text-gray-400 text-base font-normal leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                        <Link
                                            className="mt-auto text-primary font-bold text-sm hover:underline flex items-center gap-1"
                                            href={item.link || "/hizmetlerimiz"}
                                        >
                                            Daha fazla bilgi{" "}
                                            <span className="material-symbols-outlined text-sm">
                                                arrow_forward
                                            </span>
                                        </Link>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
