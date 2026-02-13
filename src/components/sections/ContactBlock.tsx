import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from '@/components/forms/ContactForm';

interface ContactBlockProps {
    formTitle: string;
    infoTitle: string;
    infoDesc: string;
    address: string;
    phone: string;
    email: string;
}

export function ContactBlock({
    formTitle,
    infoTitle,
    infoDesc,
    address,
    phone,
    email
}: ContactBlockProps) {
    return (
        <section className="relative z-20 pb-24 px-4 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                    <div className="lg:col-span-7">
                        <FadeIn direction="right" delay={400}>
                            <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-xl p-6 md:p-10 border border-slate-100 dark:border-slate-800 h-full">
                                <h3 className="text-xl font-bold mb-4">{formTitle}</h3>
                                <ContactForm />
                            </div>
                        </FadeIn>
                    </div>
                    <div className="lg:col-span-5 flex flex-col justify-center lg:pb-10 pt-10">
                        <FadeIn direction="left" delay={500}>
                            <div className="lg:pl-8">
                                <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">
                                    {infoTitle}
                                </span>
                                <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-lg">
                                    {infoDesc}
                                </p>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="size-10 rounded bg-blue-100 flex items-center justify-center text-primary"><span className="material-symbols-outlined">location_on</span></div>
                                        <div><div className="font-bold">Adres</div><div className="text-sm opacity-70">{address}</div></div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="size-10 rounded bg-blue-100 flex items-center justify-center text-primary"><span className="material-symbols-outlined">call</span></div>
                                        <div><div className="font-bold">Telefon</div><div className="text-sm opacity-70">{phone}</div></div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="size-10 rounded bg-blue-100 flex items-center justify-center text-primary"><span className="material-symbols-outlined">mail</span></div>
                                        <div><div className="font-bold">E-posta</div><div className="text-sm opacity-70">{email}</div></div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
