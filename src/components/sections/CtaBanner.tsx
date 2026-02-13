import React from 'react';
import Link from 'next/link';

interface CtaBannerProps {
    title: string;
    text: string;
    buttonText: string;
    buttonLink?: string;
}

export function CtaBanner({ title, text, buttonText, buttonLink }: CtaBannerProps) {
    return (
        <section className="relative py-24 bg-primary overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10 text-center text-white">
                <h2 className="text-3xl md:text-5xl font-black mb-6">{title}</h2>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">{text}</p>
                <Link href={buttonLink || "/iletisim"} className="inline-block bg-white text-primary font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                    {buttonText}
                </Link>
            </div>
        </section>
    );
}
