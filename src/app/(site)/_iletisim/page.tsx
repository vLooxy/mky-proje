"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { submitForm } from "@/actions/form-actions";
import { useState } from "react";

function ContactForm() {
    // Basic state for feedback
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setMessage(null);

        try {
            const result = await submitForm(null, formData);
            if (result.success) {
                setMessage({ success: true, text: result.message });
                // Reset form (simple way)
                const form = document.getElementById("contact-form") as HTMLFormElement;
                if (form) form.reset();
            } else {
                setMessage({ success: false, text: result.message });
            }
        } catch {
            setMessage({ success: false, text: "Bir hata oluştu. Lütfen tekrar deneyin." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form id="contact-form" action={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                        htmlFor="name"
                    >
                        Ad Soyad
                    </label>
                    <input
                        className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow"
                        id="name"
                        name="name"
                        placeholder="Adınız Soyadınız"
                        type="text"
                        required
                    />
                </div>
                <div>
                    <label
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                        htmlFor="email"
                    >
                        E-posta Adresi
                    </label>
                    <input
                        className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow"
                        id="email"
                        name="email"
                        placeholder="info@mkygrup.com"
                        type="email"
                        required
                    />
                </div>
            </div>
            <div>
                <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    htmlFor="subject"
                >
                    Konu
                </label>
                <select
                    className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow px-4 py-2"
                    id="subject"
                    name="subject"
                >
                    <option value="general">Genel Bilgi</option>
                    <option value="proposal">Teklif İste</option>
                    <option value="audit_request">İSG Denetim Talebi</option>
                    <option value="engineering">Mühendislik Danışmanlığı</option>
                    <option value="career">Kariyer</option>
                </select>
            </div>
            <div>
                <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    htmlFor="message"
                >
                    Mesaj
                </label>
                <textarea
                    className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow px-4 py-2"
                    id="message"
                    name="message"
                    placeholder="Projenizle ilgili size nasıl yardımcı olabiliriz?"
                    rows={5}
                    required
                ></textarea>
            </div>

            {message && (
                <div className={`p-4 rounded-lg text-sm ${message.success ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {message.text}
                </div>
            )}

            <button
                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                {!loading && (
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                        send
                    </span>
                )}
            </button>
        </form>
    );
}

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <header className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDbiEf3-dxxxW6ry5B7urPbpLud0tO1NG8MNYRInTh2FyPbYuHsdcE-p2gcy6N9kG-LdXHWZFjYtJvxQcFPDPtRBiYE-2HzAjp6-ww23INfXhjHfy4bW9iMfum_kB7BArcQYFOkPx1xJVveW_5b0i1otJqFpRCpMvxDztfJZFpnDGfEFPboa4BJDR6IYce5AvAiJpBCjJtTcXFzZrzKDmCfRcksesqgnDH45a0KgBj4DcBsR28N0FC_9pj8bw4YQeUGas9Bl_1diZc')",
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-background-light dark:to-background-dark"></div>
                <div className="relative z-10 text-center max-w-4xl px-4 mt-[-60px]">
                    <FadeIn direction="up" delay={100}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm w-fit mb-6 mx-auto">
                            <span className="material-symbols-outlined text-primary text-sm">
                                support_agent
                            </span>
                            <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">
                                Yardım etmek için buradayız
                            </span>
                        </div>
                    </FadeIn>
                    <FadeIn direction="up" delay={200}>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                            BİZE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">ULAŞIN</span>
                        </h1>
                    </FadeIn>
                    <FadeIn direction="up" delay={300}>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
                            İSG danışmanlığı, yapısal mühendislik soruları veya proje teklifi istemek
                            için uzman ekibimize ulaşın.
                        </p>
                    </FadeIn>
                </div>
            </header>

            <section className="relative z-20 -mt-32 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                        <div className="lg:col-span-7">
                            <FadeIn direction="right" delay={400}>
                                <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-xl p-6 md:p-10 border border-slate-100 dark:border-slate-800 h-full">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                        <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                                        Bize bir mesaj gönderin
                                    </h2>
                                    <ContactForm />
                                </div>
                            </FadeIn>
                        </div>
                        <div className="lg:col-span-5 flex flex-col justify-end lg:pb-10 pt-10 lg:pt-32">
                            <FadeIn direction="left" delay={500}>
                                <div className="lg:pl-8">
                                    <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">
                                        İletişim Bilgileri
                                    </span>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                        Birlikte daha güvenli bir gelecek inşa edelim
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-lg">
                                        Hızlı iletişimimizle gurur duyuyoruz. Sertifikalı mühendislerimiz ve
                                        güvenlik danışmanlarımız özel ihtiyaçlarınızı karşılamaya hazır.
                                    </p>
                                    <div className="space-y-8">
                                        {[
                                            { icon: "location_on", title: "Genel Merkez", line1: "123 Engineering Blvd,", line2: "Industrial District, NY 10012", action: null },
                                            { icon: "call", title: "Telefon", line1: "+1 (555) 123-4567", line2: "Pzt-Cum 08:00 - 18:00", action: "call" },
                                            { icon: "mail", title: "E-posta", line1: "info@mkygrup.com", line2: "ik@mkygrup.com", action: "mail" }
                                        ].map((item: { icon: string; title: string; line1: string; line2: string; action: string | null }, i) => (
                                            <div key={i} className="flex items-start gap-4 group">
                                                <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                                                    <span className="material-symbols-outlined text-2xl">
                                                        {item.icon}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                                        {item.title}
                                                    </h4>
                                                    <div className={`text-slate-600 dark:text-slate-400 leading-relaxed ${item.action ? 'hover:text-primary transition-colors cursor-pointer' : ''}`}>
                                                        <p>{item.line1}</p>
                                                        {item.icon === "call" ? (
                                                            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mt-1">{item.line2}</span>
                                                        ) : (
                                                            <p>{item.line2}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
