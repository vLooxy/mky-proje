"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

interface ProjectItem {
    title: string;
    location: string;
    image: string;
    link?: string;
}

export interface ProjectsSectionProps {
    title?: string;
    description?: string;
    items?: ProjectItem[];
}

export function ProjectsSection({ title, description, items }: ProjectsSectionProps) {
    const defaultItems: ProjectItem[] = [
        {
            title: "Petrokimya Güvenlik Denetimi",
            location: "Houston, TX",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQRGNqcxpUtMQQJZnITkyvF0seOImEPC-ZG37ZtKZ3pNknLep31mFDYpBaykQnGyKa8jTzZKuz9h5ENn7OZlEAwre5r4hGj4X_4sUrNwu2U5Ke6g3Rw4BiXpxGgD6AzwH8JrWVAQdgnkTGsfGLDs-Xh4TZ-ur6_rcZcsOqbNAqd0Mt_Dpp8JSTyJFkUkHa501Nmjd9HMQgRREm14fy8Gd38SyABKWpvzRwbiKrFE9OcPkb-2r4Ep--AtpkHtYB3Mhcht8XfRFtRPg",
            link: "/hizmetlerimiz"
        },
        {
            title: "Lojistik Merkezi Yapısı",
            location: "Chicago, IL",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1Y1cr1NcQlxjEoAEGobzuDjU_jyq9N1Kpcuhs6igMTm69y-_7O9x_TC_jlYNlvlSR0MF1KiIdLoSdGI1UIthGHxjveBGYCQopRuCzpVXO_YNZY3il6ezZ5fGYCPuRH-wwcQtGZW5jgsjhMwgbMzCrzG8SMZOe_KQsAvyKxkvS1ruQ6zDmXrPMq6xCnUqxGms2BogdEiJPFJwhwC_UFuqkh0tsEMDmgZ0wu7ILyVQctKpKFDiYkk49sKNPWBSrAW-YLnaQ4atqm0s",
            link: "/hizmetlerimiz"
        },
        {
            title: "Yeşil Enerji Entegrasyonu",
            location: "Denver, CO",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnPMJSf8rywKnYDkucS1gZAJpPNRjy0AM-PZwM9VE0vUqpfY51WXyIlbH3-Yoo7fQEHkIaVMTHuwvzc1g6AAa6QwRRBMB2Hw3TR9kEYw3aowewW_EpzFLLWOL7Z3OZUwNOoxlQpjXbS678pdwCS8xBu0dwJjsDSAbifG7Z-2bi2LSNC8QwSwPyIB684r0MzUoEUaIxDFoE2OC4tcDwhFxA22SgtqWAQGj5qJEplAUiqTiFZZ2VFhCo6ajTqOEK9ztSxDcwdVJ30H0",
            link: "/hizmetlerimiz"
        }
    ];

    const displayItems = items || defaultItems;

    return (
        <section className="flex flex-col w-full py-12 md:py-16 bg-background-light dark:bg-background-dark transition-colors duration-200">
            <div className="px-6 lg:px-40 flex justify-center">
                <div className="flex flex-col max-w-[1200px] flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                        <div>
                            <FadeIn direction="up">
                                <h2 className="text-text-main dark:text-white text-3xl font-bold leading-tight mb-2">
                                    {title || "Öne Çıkan Projeler"}
                                </h2>
                            </FadeIn>
                            <FadeIn direction="up" delay={100}>
                                <p className="text-text-light dark:text-gray-400">
                                    {description || "En son mühendislik ve güvenlik başarılarımızı keşfedin."}
                                </p>
                            </FadeIn>
                        </div>
                        <FadeIn direction="left" delay={200}>
                            <Link href="/hizmetlerimiz" className="text-primary font-bold hover:text-blue-700 flex items-center gap-1">
                                Tüm projeleri gör{" "}
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </FadeIn>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayItems.map((item, index) => (
                            <FadeIn key={index} delay={300 + (index * 100)} direction="up">
                                <div className="group cursor-pointer flex flex-col gap-3">
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
                                        <div
                                            className="w-full h-full bg-center bg-no-repeat bg-cover transform group-hover:scale-105 transition-transform duration-500"
                                            data-alt={item.title}
                                            style={{
                                                backgroundImage: `url("${item.image}")`,
                                            }}
                                        ></div>
                                    </div>
                                    <div>
                                        <h3 className="text-text-main dark:text-white font-bold text-lg">
                                            {item.title}
                                        </h3>
                                        <p className="text-text-light dark:text-gray-500 text-sm">
                                            {item.location}
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
