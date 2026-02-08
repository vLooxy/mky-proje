"use client";

import { FadeIn } from "@/components/ui/FadeIn";

export default function MissionPage() {
    return (
        <div className="min-h-screen bg-[#F0F4F8] dark:bg-[#0B1120] overflow-hidden">
            {/* 1. Typographic Hero Section */}
            <section className="relative w-full h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
                    {/* Abstract grid/line background could go here */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
                </div>

                <div className="z-10 text-center relative mix-blend-multiply dark:mix-blend-normal">
                    <FadeIn delay={100} direction="up">
                        <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] text-primary uppercase mb-4">
                            MKY Grup
                        </h2>
                    </FadeIn>
                    <FadeIn delay={300} direction="up">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                            GELECEK<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">İÇİN</span><br />
                            GÜVENLİK
                        </h1>
                    </FadeIn>
                    <FadeIn delay={500} direction="up">
                        <p className="mt-8 text-lg max-w-2xl mx-auto text-slate-600 dark:text-slate-400 font-medium">
                            Sadece yapıları sağlamlaştırmıyoruz; yarının endüstriyel standartlarını ve çalışma kültürünü inşa ediyoruz.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 2. Layered Mission Section (Staggered parallax feel) */}
            <section className="relative w-full py-32 px-4 md:px-8">
                <div className="max-w-7xl mx-auto relative">
                    {/* Background Text Layer */}
                    <div className="absolute -top-20 -left-10 md:left-0 text-[10rem] md:text-[15rem] font-black text-slate-200 dark:text-slate-800/30 leading-none select-none z-0 opacity-50">
                        MİS
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                        {/* Image/Visual Layer - Left aligned but overlapping */}
                        <div className="md:col-span-7 h-[500px] md:h-[600px] relative">
                            <FadeIn direction="right" className="w-full h-full">
                                <div className="absolute inset-0 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
                                    <div
                                        className="w-full h-full bg-cover bg-center opacity-60 mix-blend-overlay"
                                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-cd119277f82e?q=80&w=2070&auto=format&fit=crop')" }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />

                                    <div className="absolute bottom-10 left-10 p-4 border-l-4 border-primary">
                                        <div className="text-white text-4xl font-bold">01</div>
                                        <div className="text-slate-300 uppercase tracking-widest text-sm">Misyonumuz</div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Content Layer - Overlapping */}
                        <div className="md:col-span-5 md:-ml-24 mt-8 md:mt-0">
                            <FadeIn direction="left" delay={200}>
                                <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                        Endüstriyi <span className="text-primary">Dönüştürmek</span>
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                                        Misyonumuz, mühendislik mükemmelliği ile iş güvenliği kültürünü birleştirerek, riskleri minimize eden ve verimliliği maksimize eden sürdürülebilir çözümler sunmaktır.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "Sıfır kaza hedefiyle çalışma",
                                            "Yenilikçi mühendislik çözümleri",
                                            "Sürdürülebilir büyüme odaklı yaklaşım"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-medium">
                                                <span className="w-2 h-2 bg-primary rounded-full" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Layered Vision Section (Reverse Layout) */}
            <section className="relative w-full py-32 px-4 md:px-8 bg-slate-900 dark:bg-black text-white overflow-hidden">
                <div className="max-w-7xl mx-auto relative">
                    {/* Background Graphic */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
                    <div className="absolute -bottom-20 -right-10 md:right-0 text-[10rem] md:text-[15rem] font-black text-white/5 leading-none select-none z-0">
                        VİZ
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                        {/* Content Layer - Left Side this time */}
                        <div className="md:col-span-5 md:first-letter: pl-4">
                            <FadeIn direction="right" delay={200}>
                                <div className="relative z-20">
                                    <h3 className="text-3xl md:text-5xl font-bold mb-6">
                                        Küresel <span className="text-blue-400">Referans</span> Olmak
                                    </h3>
                                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                        Vizyonumuz, iş sağlığı ve güvenliği ile yapısal mühendislik alanında dünya çapında tanınan, güvenilen ve örnek alınan lider kuruluş olmaktır. Teknolojiyi ve insan odaklı yaklaşımı birleştiriyoruz.
                                    </p>

                                    <div className="flex gap-4">
                                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                            <div className="text-3xl font-bold text-primary mb-1">20+</div>
                                            <div className="text-sm text-slate-400">Ülke</div>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                            <div className="text-3xl font-bold text-primary mb-1">500+</div>
                                            <div className="text-sm text-slate-400">Tamamlanan Proje</div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Image Layer - Right Side */}
                        <div className="md:col-span-7 h-[500px] md:h-[600px] relative md:-ml-12">
                            <FadeIn direction="left" className="w-full h-full">
                                <div className="w-full h-full relative">
                                    <div className="absolute inset-0 bg-[#0B1120] rounded-2xl transform -rotate-2 border border-white/10 z-0"></div>
                                    <div className="absolute inset-0 bg-cover bg-center rounded-2xl shadow-2xl z-10 transform md:rotate-3 hover:rotate-0 transition-transform duration-700 overflow-hidden"
                                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop')" }}>
                                        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
                                    </div>
                                    {/* Badge */}
                                    <div className="absolute top-10 right-10 z-20 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                                        <span className="material-symbols-outlined text-4xl text-primary">public</span>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Values Stream (Horizontal Scroll / Grid) */}
            <section className="w-full py-32 bg-[#F0F4F8] dark:bg-[#0B1120]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-16">
                    <FadeIn direction="up">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Değerlerimiz</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-2">Bizi Biz Yapanlar</h2>
                    </FadeIn>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: "Dürüstlük", desc: "Şeffaflık ve etik değerler her kararımızın temelidir.", icon: "verified" },
                        { title: "İnovasyon", desc: "Sürekli gelişim ve teknolojik yenilikleri takip ederiz.", icon: "lightbulb" },
                        { title: "İnsan Odaklılık", desc: "Çalışan güvenliği ve mutluluğu en büyük önceliğimizdir.", icon: "groups" },
                        { title: "Mükemmellik", desc: "Standartları belirleyen kalite anlayışıyla çalışırız.", icon: "diamond" },
                        { title: "Sürdürülebilirlik", desc: "Gelecek nesillere yaşanabilir bir dünya bırakmayı hedefleriz.", icon: "eco" },
                        { title: "Çözüm Ortaklığı", desc: "Müşterilerimizle uzun vadeli güven ilişkisi kurarız.", icon: "handshake" }
                    ].map((value, i) => (
                        <FadeIn key={i} delay={i * 100} direction="up" className="h-full">
                            <div className="group h-full bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-primary rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined">{value.icon}</span>
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{value.title}</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {value.desc}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>
        </div>
    );
}
