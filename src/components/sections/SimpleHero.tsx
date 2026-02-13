import React from 'react';

interface SimpleHeroProps {
    title: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundImage?: string;
}

export function SimpleHero({ title, subtitle, buttonText, buttonLink, backgroundImage }: SimpleHeroProps) {
    return (
        <section className="relative bg-slate-900 text-white py-24 px-6 text-center overflow-hidden">
            {backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            )}
            <div className="relative z-10 max-w-4xl mx-auto">
                <h1
                    className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                {subtitle && (
                    <div
                        className="text-xl text-slate-300 mb-8"
                        dangerouslySetInnerHTML={{ __html: subtitle }}
                    />
                )}
                {buttonText && (
                    <a
                        href={buttonLink || '#'}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
                    >
                        {buttonText}
                    </a>
                )}
            </div>
        </section>
    );
}
