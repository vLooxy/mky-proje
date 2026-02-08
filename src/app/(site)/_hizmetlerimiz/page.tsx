"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title={
                    <>
                        Kapsamlı Mühendislik ve<br /> Güvenlik Çözümleri
                    </>
                }
                description="Uzman danışmanlık ve yönetim hizmetlerimizle iş gücünüz için uyumluluk ve operasyonel mükemmelliği sağlıyoruz. Güvenliği her adımda inşa ediyoruz."
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuDWFffgFKdMSVfadfLO-wz6xPxo8RGuXYcTOJV-1WCOPAIpEeki_yiXycGYTUrKgMUOG1eUdfMnOTM_29bhhzeyyVOIxvVT04gIDV978njbvgudQVHuxfejqFBsNh46K7DeUW08AZZUYbQOFrG03GmpFZ0QOC7Qr38SuccACifqDWD2gqLrZpDjpz-QCL1Fye8orJtxE48xedbl62xm24A2Kfv-4TZ1vojfaatPOeNjiE2W2hS5WYeOAjwyvryg09eGwY3vrHNQvjQ"
                height="h-[50vh]"
            />
            {/* Trust Indicators */}
            <div className="w-full border-b border-[#f0f2f4] dark:border-[#2a3441] bg-white dark:bg-[#15202b] py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-6">
                    <FadeIn direction="up">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                            Dünya çapında endüstri liderleri tarafından güvenilmektedir
                        </p>
                    </FadeIn>
                    <FadeIn direction="up" delay={200}>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-400">
                                <span className="material-symbols-outlined">verified_user</span> ISO
                                9001
                            </div>
                            <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-400">
                                <span className="material-symbols-outlined">shield</span> OSHA
                                Compliant
                            </div>
                            <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-400">
                                <span className="material-symbols-outlined">eco</span> LEED
                                Certified
                            </div>
                            <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-400">
                                <span className="material-symbols-outlined">security</span> SafeWork
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Services Grid */}
            <section className="flex-1 bg-background-light dark:bg-background-dark py-16 px-4 md:px-10 lg:px-20">
                <div className="max-w-7xl mx-auto flex flex-col gap-12">
                    {/* Section Header */}
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <FadeIn direction="up">
                            <h2 className="text-[#111418] dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                                Temel Hizmetlerimiz
                            </h2>
                        </FadeIn>
                        <FadeIn direction="up" delay={200}>
                            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
                                Riskleri azaltmak ve tüm operasyonel yaşam döngünüz boyunca performansı optimize etmek için tasarlanmış özel çözümler.
                            </p>
                        </FadeIn>
                    </div>
                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Card 1 */}
                        <FadeIn delay={100} direction="up" className="h-full">
                            <ServiceCard
                                icon="analytics"
                                title="Risk Değerlendirmesi"
                                description="İş yeri güvenliği ve yasal uyumluluğu sağlamak için kapsamlı tehlike tanımlama ve nicel risk analizi."
                            />
                        </FadeIn>
                        {/* Card 2 */}
                        <FadeIn delay={200} direction="up" className="h-full">
                            <ServiceCard
                                icon="forest"
                                title="Çevre Danışmanlığı"
                                description="Çevresel etki değerlendirmeleri, sürdürülebilirlik raporlaması ve atık yönetimi stratejileri konusunda uzman rehberliği."
                            />
                        </FadeIn>
                        {/* Card 3 */}
                        <FadeIn delay={300} direction="up" className="h-full">
                            <ServiceCard
                                icon="precision_manufacturing"
                                title="Mühendislik Proje Yönetimi"
                                description="Endüstriyel inşaat projeleri için uçtan uca gözetim, zaman çizelgelerine ve bütçelere hassasiyetle uyulmasını sağlar."
                            />
                        </FadeIn>
                        {/* Card 4 */}
                        <FadeIn delay={400} direction="up" className="h-full">
                            <ServiceCard
                                icon="school"
                                title="Güvenlik Eğitimi"
                                description="İş gücünüzü güvenlik bilgisiyle güçlendirmek için tasarlanmış sertifikalı İSG atölyeleri ve özel e-öğrenme modülleri."
                            />
                        </FadeIn>
                        {/* Card 5 */}
                        <FadeIn delay={500} direction="up" className="h-full">
                            <ServiceCard
                                icon="fact_check"
                                title="Uyumluluk Denetimi"
                                description="Eksiklikleri belirlemek ve düzeltici eylemleri uygulamak için yerel ve uluslararası standartlara karşı titiz yasal kontroller."
                            />
                        </FadeIn>
                        {/* Card 6 */}
                        <FadeIn delay={600} direction="up" className="h-full">
                            <ServiceCard
                                icon="health_and_safety"
                                title="Endüstriyel Hijyen"
                                description="Çalışan sağlığını kimyasal ve fiziksel tehlikelerden korumak için iş yeri maruziyet izleme ve kontrol hizmetleri."
                            />
                        </FadeIn>
                    </div>

                    {/* Featured Project / Highlight Section */}
                    <FadeIn direction="up" delay={600}>
                        <div className="mt-8 overflow-hidden rounded-xl bg-white dark:bg-[#1a2634] shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div
                                    className="h-64 md:h-auto md:w-2/5 bg-cover bg-center"
                                    data-alt="Safety inspectors reviewing site plans at a construction site"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6ViqKzCU6oJyAjSaYJDE0fLSLqz-ZKTJKjtRwuv69iCH7Rwyog7WTXzEm5URsI9pZjfrYN5BRu-XIz3wzNovXh5nR_tCDGljKQ82WXdo1uqmHT-x9RLlGv1e1ppenC7vjGmZ4l9hE1vcYVgah5O4vjAOQdWuLJTBhqY7s7XVKhyO6xvs1NHHnqH-pLZ9DughojljBrbS1bbTVKcxF1F2Iu6VN4KGMvrsdqVU6LEh73yxAE-wSdr4wBrvtTW030I5Nt8oTbcjfKmU")',
                                    }}
                                ></div>
                                <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
                                    <div className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
                                        Vaka Çalışması
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold text-[#111418] dark:text-white md:text-3xl">
                                        Küresel Üretim Güvenliği Revizyonu
                                    </h3>
                                    <p className="mb-6 text-gray-600 dark:text-gray-400">
                                        Çok uluslu bir üretici için kapsamlı bir İSG yönetim sistemi başarıyla uyguladık ve ilk yıl içinde kayıp zamanlı yaralanmaları %45 azalttık.
                                    </p>
                                    <div>
                                        <button className="rounded-lg border border-solid border-[#dce0e5] dark:border-gray-600 bg-transparent px-6 py-3 text-sm font-bold text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            Vaka Çalışmasını Oku
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}

function ServiceCard({
    icon,
    title,
    description,
}: {
    icon: string;
    title: string;
    description: string;
}) {
    return (
        <div className="group flex flex-col rounded-xl bg-white dark:bg-[#1a2634] p-6 shadow-sm border border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300 h-full">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[28px]">{icon}</span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#111418] dark:text-white">
                {title}
            </h3>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {description}
            </p>
            <Link
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors mt-auto"
                href="/"
            >
                Daha Fazla Bilgi{" "}
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                    arrow_forward
                </span>
            </Link>
        </div>
    );
}
