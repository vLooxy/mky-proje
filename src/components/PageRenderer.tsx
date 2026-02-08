/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { PageHeader } from './ui/PageHeader';
import { BlogGrid } from './sections/BlogGrid';
import { ContactForm } from './forms/ContactForm';
import { ServiceCard } from './cards/ServiceCard';
import { HeroSection } from './features/home/HeroSection';
import { StatsSection } from './features/home/StatsSection';
import { ServicesSection } from './features/home/ServicesSection';
import { ProjectsSection } from './features/home/ProjectsSection';
import { CTASection } from './features/home/CTASection';
import { AboutPurpose } from './features/about/AboutPurpose';
import { MissionHero } from './features/mission/MissionHero';
import { TrustIndicators } from './features/services/TrustIndicators';
import { BlogHero } from './features/blog/BlogHero';
import { BlogContent } from './features/blog/BlogContent';
import { ContactHero } from './features/contact/ContactHero';
import { ContactContent } from './features/contact/ContactContent';
import { HomeModernHero } from './features/home/HomeModernHero';

interface SectionContent {
    [key: string]: any;
}



interface PageRendererProps {
    sections: Array<{
        id: string;
        type: string;
        content: string | SectionContent; // String (legacy) or Object
    }>;
}

export function PageRenderer({ sections }: PageRendererProps) {
    if (!sections || sections.length === 0) return null;

    return (
        <div className="flex flex-col gap-0 w-full overflow-x-hidden">
            {sections.map((section) => {
                const content = typeof section.content === 'string'
                    ? JSON.parse(section.content)
                    : section.content;

                switch (section.type) {
                    // --- HOME PAGE SPECIFIC COMPONENTS ---
                    case 'home-hero':
                        return <HeroSection key={section.id} content={content} />;

                    case 'home-stats':
                        return <StatsSection key={section.id} items={content.items} />;

                    case 'home-services':
                        return (
                            <ServicesSection
                                key={section.id}
                                subtitle={content.subtitle}
                                title={content.title}
                                description={content.description}
                                items={content.items}
                            />
                        );

                    case 'home-projects':
                        return (
                            <ProjectsSection
                                key={section.id}
                                title={content.title}
                                description={content.description}
                                items={content.items}
                            />
                        );

                    case 'home-cta':
                        return (
                            <CTASection
                                key={section.id}
                                title={content.title}
                                text={content.text}
                                buttonText={content.buttonText}
                                buttonLink={content.buttonLink}
                                secondaryButtonText={content.secondaryButtonText}
                                secondaryButtonLink={content.secondaryButtonLink}
                            />
                        );

                    // --- OTHER PAGES CUSTOM COMPONENTS ---
                    case 'about-purpose':
                        return (
                            <AboutPurpose
                                key={section.id}
                                title={content.title}
                                subtitle={content.subtitle}
                                description={content.description}
                                visionTitle={content.visionTitle}
                                visionDesc={content.visionDesc}
                                missionTitle={content.missionTitle}
                                missionDesc={content.missionDesc}
                            />
                        );

                    case 'mission-hero':
                        return (
                            <MissionHero
                                key={section.id}
                                smallTitle={content.smallTitle}
                                titleLine1={content.titleLine1}
                                titleLine2={content.titleLine2}
                                titleLine3={content.titleLine3}
                                description={content.description}
                            />
                        );

                    case 'trust-indicators':
                        return (
                            <TrustIndicators
                                key={section.id}
                                title={content.title}
                                items={content.items}
                            />
                        );

                    case 'blog-hero':
                        return (
                            <BlogHero
                                key={section.id}
                                title={content.title}
                                subtitle={content.subtitle}
                                description={content.description}
                                badge={content.badge}
                                backgroundImage={content.backgroundImage}
                            />
                        );

                    case 'blog-content':
                        return (
                            <BlogContent
                                key={section.id}
                                itemsPerPage={content.itemsPerPage}
                                showSearch={content.showSearch}
                            />
                        );

                    case 'contact-hero':
                        return (
                            <ContactHero
                                key={section.id}
                                title={content.title}
                                description={content.description}
                                badge={content.badge}
                                backgroundImage={content.backgroundImage}
                            />
                        );

                    case 'contact-content':
                        return (
                            <ContactContent
                                key={section.id}
                                formTitle={content.formTitle}
                                infoTitle={content.infoTitle}
                                infoDesc={content.infoDesc}
                                address={content.address}
                                phone={content.phone}
                                email={content.email}
                            />
                        );

                    case 'hero-modern':
                        return (
                            <HomeModernHero
                                key={section.id}
                                smallTitle={content.smallTitle}
                                titleLine1={content.titleLine1}
                                titleLine2={content.titleLine2}
                                titleLine3={content.titleLine3}
                                description={content.description}
                            />
                        );

                    case 'layered-content':
                        const isReverse = content.reverse;
                        return (
                            <section key={section.id} className={`relative w-full py-32 px-4 md:px-8 ${isReverse ? 'bg-slate-900 dark:bg-black text-white' : 'bg-[#F0F4F8] dark:bg-[#0B1120]'}`}>
                                <div className="max-w-7xl mx-auto relative">
                                    {content.bgText && (
                                        <div className={`absolute ${isReverse ? '-bottom-20 -right-10 md:right-0 text-white/5' : '-top-20 -left-10 md:left-0 text-slate-200 dark:text-slate-800/30'} text-[10rem] md:text-[15rem] font-black leading-none select-none z-0 opacity-50`}>
                                            {content.bgText}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                                        {/* Image Layer */}
                                        <div className={`md:col-span-7 h-[500px] md:h-[600px] relative ${isReverse ? 'md:order-2 md:-ml-12' : ''}`}>
                                            <FadeIn direction={isReverse ? "left" : "right"} className="w-full h-full">
                                                <div className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 ease-out ${isReverse ? 'bg-[#0B1120] -rotate-2 md:rotate-3 hover:rotate-0' : 'bg-slate-900 md:rotate-2 hover:rotate-0'}`}>
                                                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${content.image}')` }}>
                                                        <div className={`absolute inset-0 ${isReverse ? 'bg-blue-900/40 mix-blend-multiply' : 'bg-gradient-to-t from-slate-900 to-transparent opacity-60 mix-blend-overlay'}`} />
                                                    </div>
                                                    {/* Badge/Number */}
                                                    {content.number && !isReverse && (
                                                        <div className="absolute bottom-10 left-10 p-4 border-l-4 border-primary">
                                                            <div className="text-white text-4xl font-bold">{content.number}</div>
                                                            <div className="text-slate-300 uppercase tracking-widest text-sm">{content.category}</div>
                                                        </div>
                                                    )}
                                                    {isReverse && (
                                                        <div className="absolute top-10 right-10 z-20 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                                                            <span className="material-symbols-outlined text-4xl text-primary">public</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </FadeIn>
                                        </div>

                                        {/* Content Layer */}
                                        <div className={`md:col-span-5 ${isReverse ? 'md:order-1 md:pl-4' : 'md:-ml-24 mt-8 md:mt-0'}`}>
                                            <FadeIn direction={isReverse ? "right" : "left"} delay={200}>
                                                <div className={!isReverse ? "bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800" : "relative z-20"}>
                                                    <h3 className={`text-3xl md:text-5xl font-bold mb-6 ${!isReverse ? "text-slate-900 dark:text-white" : ""}`}>
                                                        {content.titlePart1} <span className={!isReverse ? "text-primary" : "text-blue-400"}>{content.titlePart2}</span>
                                                    </h3>
                                                    <p className={`text-lg leading-relaxed mb-6 ${!isReverse ? "text-slate-600 dark:text-slate-400" : "text-slate-400"}`}>
                                                        {content.description}
                                                    </p>

                                                    {/* List */}
                                                    {content.list && content.list.length > 0 && (
                                                        <ul className="space-y-4">
                                                            {content.list.map((item: string, i: number) => (
                                                                <li key={i} className={`flex items-center gap-4 font-medium ${!isReverse ? "text-slate-700 dark:text-slate-300" : ""}`}>
                                                                    <span className="w-2 h-2 bg-primary rounded-full" />
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}

                                                    {/* Stats (for Vision) */}
                                                    {content.stats && content.stats.length > 0 && (
                                                        <div className="flex gap-4 mt-8">
                                                            {content.stats.map((stat: any, i: number) => (
                                                                <div key={i} className={`p-4 rounded-xl ${!isReverse ? 'bg-slate-50 dark:bg-white/5' : 'bg-white/5 border border-white/10 backdrop-blur-sm'}`}>
                                                                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                                                    <div className={`text-sm ${!isReverse ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </FadeIn>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        );

                    case 'values-grid':
                        return (
                            <section key={section.id} className="w-full py-32 bg-[#F0F4F8] dark:bg-[#0B1120]">
                                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-16">
                                    <FadeIn direction="up">
                                        <span className="text-primary font-bold tracking-widest uppercase text-sm">{content.title}</span>
                                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-2">{content.subtitle}</h2>
                                    </FadeIn>
                                </div>
                                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {(content.items || []).map((value: any, i: number) => (
                                        <FadeIn key={i} delay={i * 100} direction="up" className="h-full">
                                            <div className="group h-full bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                                                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-primary rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                    <span className="material-symbols-outlined">{value.icon || 'star'}</span>
                                                </div>
                                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{value.title}</h4>
                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{value.desc}</p>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </div>
                            </section>
                        );

                    case 'timeline':
                        return (
                            <section key={section.id} className="w-full py-20 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="mb-16">
                                        <FadeIn direction="up">
                                            <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">{content.title}</span>
                                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">{content.subtitle}</h2>
                                        </FadeIn>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 transform md:-translate-x-1/2"></div>
                                        <div className="space-y-12">
                                            {(content.items || []).map((item: any, i: number) => {
                                                const order = i % 2 === 0 ? 'left' : 'right';
                                                return (
                                                    <FadeIn key={i} direction={order === "left" ? "right" : "left"}>
                                                        <div className="relative flex flex-col md:flex-row items-start md:items-center w-full group">
                                                            <div className={`w-full md:w-1/2 pl-20 md:pl-0 md:pr-16 md:text-right ${order === 'right' ? 'md:order-1' : ''}`}>
                                                                {order === 'left' ? (
                                                                    <h3 className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors">{item.year}</h3>
                                                                ) : (
                                                                    <>
                                                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                                                        <p className="text-slate-600 dark:text-slate-400 mt-2">{item.desc}</p>
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 size-4 bg-white dark:bg-slate-800 border-4 border-primary rounded-full z-10 shadow-[0_0_0_4px_rgba(37,99,235,0.2)]"></div>
                                                            <div className={`w-full md:w-1/2 pl-20 md:pl-16 ${order === 'right' ? 'md:order-2' : ''}`}>
                                                                {order === 'right' ? (
                                                                    <h3 className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors">{item.year}</h3>
                                                                ) : (
                                                                    <>
                                                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                                                        <p className="text-slate-600 dark:text-slate-400 mt-2">{item.desc}</p>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </FadeIn>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        );

                    case 'team-grid':
                        return (
                            <section key={section.id} className="w-full py-20 bg-white dark:bg-[#1a2632]">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <FadeIn direction="up">
                                        <div className="mb-12 md:mb-16 flex justify-between items-end">
                                            <div>
                                                <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">{content.title}</span>
                                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">{content.subtitle}</h2>
                                            </div>
                                            <div className="hidden md:block">
                                                <Link className="text-primary font-bold flex items-center gap-2 hover:underline" href="/">
                                                    Tüm Ekibi Gör <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </FadeIn>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {(content.items || []).map((member: any, i: number) => (
                                            <FadeIn key={i} delay={i * 100} direction="up" >
                                                <div className="group bg-background-light dark:bg-background-dark rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                                    <div className="h-80 overflow-hidden relative">
                                                        <div className="w-full h-full bg-cover bg-top group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${member.image}')` }}></div>
                                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    </div>
                                                    <div className="p-6">
                                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                                                        <p className="text-primary font-medium text-sm mb-4">{member.role}</p>
                                                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{member.desc}</p>
                                                        <div className="flex gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                                            <a className="text-slate-900 dark:text-white hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </FadeIn>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        );

                    case 'hero':
                        return (
                            <section key={section.id} className="relative bg-slate-900 text-white py-24 px-6 text-center overflow-hidden">
                                {content.backgroundImage && (
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-30"
                                        style={{ backgroundImage: `url(${content.backgroundImage})` }}
                                    />
                                )}
                                <div className="relative z-10 max-w-4xl mx-auto">
                                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{content.title}</h1>
                                    {content.subtitle && <p className="text-xl text-slate-300 mb-8">{content.subtitle}</p>}
                                    {content.buttonText && (
                                        <a
                                            href={content.buttonLink || '#'}
                                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
                                        >
                                            {content.buttonText}
                                        </a>
                                    )}
                                </div>
                            </section>
                        );

                    case 'text':
                        return (
                            <section key={section.id} className="py-16 px-6 bg-white dark:bg-slate-900">
                                <div
                                    className="max-w-prose mx-auto prose dark:prose-invert"
                                    dangerouslySetInnerHTML={{ __html: content.html }}
                                />
                            </section>
                        );

                    case 'page-header':
                        return (
                            <PageHeader
                                key={section.id}
                                title={<span dangerouslySetInnerHTML={{ __html: content.title }}></span>}
                                description={content.description}
                                image={content.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"}
                                height={content.height || "h-[50vh]"}
                            />
                        );

                    case 'stats-section':
                        return (
                            <section key={section.id} className="relative z-20 -mt-16 pb-16 px-4">
                                <FadeIn direction="up" delay={600} className="w-full max-w-7xl mx-auto">
                                    <div className="bg-white dark:bg-[#1a2634] rounded-2xl shadow-xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100 dark:divide-gray-700">
                                        {(content.items || []).map((stat: any, i: number) => (
                                            <div key={i} className={`flex flex-col items-center text-center ${i > 0 ? "pl-8" : ""}`}>
                                                <div className="mb-2 text-primary">
                                                    <span className="material-symbols-outlined text-4xl">{stat.icon}</span>
                                                </div>
                                                <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-1">
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </FadeIn>
                            </section >
                        );

                    case 'cta-banner':
                        return (
                            <section key={section.id} className="relative py-24 bg-primary overflow-hidden">
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center text-white">
                                    <h2 className="text-3xl md:text-5xl font-black mb-6">{content.title}</h2>
                                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">{content.text}</p>
                                    <Link href={content.buttonLink || "/iletisim"} className="inline-block bg-white text-primary font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                                        {content.buttonText}
                                    </Link>
                                </div>
                            </section>
                        );

                    case 'trust-logos':
                        return (
                            <div key={section.id} className="w-full border-b border-[#f0f2f4] dark:border-[#2a3441] bg-white dark:bg-[#15202b] py-8">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-6">
                                    <FadeIn direction="up">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                                            {content.title}
                                        </p>
                                    </FadeIn>
                                    <FadeIn direction="up" delay={200}>
                                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                            {(content.items || []).map((item: any, i: number) => (
                                                <div key={i} className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-400" >
                                                    <span className="material-symbols-outlined">{item.icon}</span> {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    </FadeIn>
                                </div >
                            </div >
                        );

                    case 'services-grid':
                        return (
                            <section key={section.id} className="flex-1 bg-background-light dark:bg-background-dark py-16 px-4 md:px-10 lg:px-20">
                                <div className="max-w-7xl mx-auto flex flex-col gap-12">
                                    <div className="flex flex-col gap-2 text-center md:text-left">
                                        <FadeIn direction="up">
                                            <h2 className="text-[#111418] dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                                                {content.title}
                                            </h2>
                                        </FadeIn>
                                        <FadeIn direction="up" delay={200}>
                                            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
                                                {content.description}
                                            </p>
                                        </FadeIn>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                        {(content.items || []).map((item: any, i: number) => (
                                            <FadeIn key={i} delay={100 * (i + 1)} direction="up" className="h-full" >
                                                <ServiceCard
                                                    icon={item.icon}
                                                    title={item.title}
                                                    description={item.desc}
                                                />
                                            </FadeIn>
                                        ))}
                                    </div>
                                </div>
                            </section >
                        );

                    case 'projects-slider':
                        return (
                            <section key={section.id} className="w-full py-20 bg-[#101922] overflow-hidden">
                                <div className="max-w-[1920px] mx-auto min-h-[600px] flex flex-col lg:flex-row">
                                    {/* Left Content */}
                                    <div className="w-full lg:w-1/3 p-8 lg:p-16 flex flex-col justify-center relative z-10 bg-[#101922]">
                                        <FadeIn direction="right">
                                            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/20">
                                                {content.subtitle}
                                            </span>
                                            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
                                                {content.title}
                                            </h2>
                                            <div className="flex gap-4 mt-8">
                                                <button className="w-12 h-12 rounded-full border border-slate-700 text-white hover:bg-white hover:text-black flex items-center justify-center transition-all">
                                                    <span className="material-symbols-outlined">arrow_back</span>
                                                </button>
                                                <button className="w-12 h-12 rounded-full bg-primary text-white hover:bg-blue-600 flex items-center justify-center transition-all shadow-lg shadow-blue-900/50">
                                                    <span className="material-symbols-outlined">arrow_forward</span>
                                                </button>
                                            </div>
                                        </FadeIn>
                                    </div>
                                    {/* Slider Area */}
                                    <div className="w-full lg:w-2/3 relative h-[50vh] lg:h-auto">
                                        <div className="flexh-full space-x-4 p-4 overflow-x-auto">
                                            {(content.items || []).map((item: any, i: number) => (
                                                <div key={i} className="relative min-w-[300px] md:min-w-[400px] h-[400px] rounded-xl overflow-hidden group inline-block mr-4" >
                                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${item.image})` }}></div>
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                                    <div className="absolute bottom-0 left-0 p-8">
                                                        <div className="text-blue-400 text-xs font-bold uppercase mb-2">{item.location}</div>
                                                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section >
                        );

                    case 'featured-case':
                        return (
                            <section key={section.id} className="py-10 px-4 max-w-7xl mx-auto">
                                <FadeIn direction="up" delay={300}>
                                    <div className="mt-8 overflow-hidden rounded-xl bg-white dark:bg-[#1a2634] shadow-sm border border-slate-100 dark:border-slate-800">
                                        <div className="flex flex-col md:flex-row">
                                            <div
                                                className="h-64 md:h-auto md:w-2/5 bg-cover bg-center"
                                                style={{ backgroundImage: `url("${content.image}")` }}
                                            ></div>
                                            <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
                                                <div className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
                                                    {content.category}
                                                </div>
                                                <h3 className="mb-4 text-2xl font-bold text-[#111418] dark:text-white md:text-3xl">
                                                    {content.title}
                                                </h3>
                                                <p className="mb-6 text-gray-600 dark:text-gray-400">
                                                    {content.text}
                                                </p>
                                                <div>
                                                    <button className="rounded-lg border border-solid border-[#dce0e5] dark:border-gray-600 bg-transparent px-6 py-3 text-sm font-bold text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                        {content.buttonText}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            </section>
                        );

                    case 'contact-block':
                        return (
                            <section key={section.id} className="relative z-20 pb-24 px-4 bg-background-light dark:bg-background-dark">
                                <div className="max-w-7xl mx-auto">
                                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                                        <div className="lg:col-span-7">
                                            <FadeIn direction="right" delay={400}>
                                                <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-xl p-6 md:p-10 border border-slate-100 dark:border-slate-800 h-full">
                                                    <h3 className="text-xl font-bold mb-4">{content.formTitle}</h3>
                                                    <ContactForm />
                                                </div>
                                            </FadeIn>
                                        </div>
                                        <div className="lg:col-span-5 flex flex-col justify-center lg:pb-10 pt-10">
                                            <FadeIn direction="left" delay={500}>
                                                <div className="lg:pl-8">
                                                    <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">
                                                        {content.infoTitle}
                                                    </span>
                                                    <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-lg">
                                                        {content.infoDesc}
                                                    </p>
                                                    <div className="space-y-6">
                                                        <div className="flex items-start gap-4">
                                                            <div className="size-10 rounded bg-blue-100 flex items-center justify-center text-primary"><span className="material-symbols-outlined">location_on</span></div>
                                                            <div><div className="font-bold">Adres</div><div className="text-sm opacity-70">{content.address}</div></div>
                                                        </div>
                                                        <div className="flex items-start gap-4">
                                                            <div className="size-10 rounded bg-blue-100 flex items-center justify-center text-primary"><span className="material-symbols-outlined">call</span></div>
                                                            <div><div className="font-bold">Telefon</div><div className="text-sm opacity-70">{content.phone}</div></div>
                                                        </div>
                                                        <div className="flex items-start gap-4">
                                                            <div className="size-10 rounded bg-blue-100 flex items-center justify-center text-primary"><span className="material-symbols-outlined">mail</span></div>
                                                            <div><div className="font-bold">E-posta</div><div className="text-sm opacity-70">{content.email}</div></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </FadeIn>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        );

                    case 'blog-grid':
                        return (
                            <BlogGrid
                                key={section.id}
                                title={content.title}
                                showSearch={content.showSearch}
                                itemsPerPage={content.itemsPerPage}
                            />
                        );

                    case 'faq-accordion':
                        return (
                            <section key={section.id} className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                                <div className="max-w-4xl mx-auto px-6">
                                    <div className="text-center mb-12">
                                        <FadeIn direction="up">
                                            <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">{content.subtitle}</span>
                                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">{content.title}</h2>
                                        </FadeIn>
                                    </div>
                                    <div className="space-y-4">
                                        {(content.items || []).map((item: any, i: number) => (
                                            <FadeIn key={i} delay={i * 100} direction="up" >
                                                <details className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 open:bg-white dark:open:bg-slate-800/80 open:shadow-lg transition-all duration-300">
                                                    <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-lg text-slate-900 dark:text-white marker:content-none select-none">
                                                        {item.question}
                                                        <span className="ml-4 transition-transform duration-300 group-open:rotate-180 text-primary">
                                                            <span className="material-symbols-outlined">expand_more</span>
                                                        </span>
                                                    </summary>
                                                    <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-300">
                                                        <p className="leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">{item.answer}</p>
                                                    </div>
                                                </details>
                                            </FadeIn>
                                        ))}
                                    </div>
                                </div>
                            </section >
                        );

                    case 'comparison-table':
                        return (
                            <section key={section.id} className="py-24 bg-slate-50 dark:bg-[#0B1120]">
                                <div className="max-w-7xl mx-auto px-4 md:px-8">
                                    <div className="text-center mb-16">
                                        <FadeIn direction="up">
                                            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">{content.title}</h2>
                                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{content.subtitle}</p>
                                        </FadeIn>
                                    </div>
                                    <FadeIn direction="up" delay={200}>
                                        <div className="overflow-x-auto rounded-2xl shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                                        {(content.columns || []).map((col: string, i: number) => (
                                                            <th key={i} className={`p-6 md:p-8 font-bold text-lg text-slate-900 dark:text-white ${i === 0 ? 'w-1/3' : 'text-center'}`}>
                                                                {col}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                    {(content.rows || []).map((row: any, i: number) => (
                                                        <tr key={i} className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors" >
                                                            <td className="p-6 md:p-8 font-medium text-slate-700 dark:text-slate-200">{row.feature}</td>
                                                            <td className="p-6 md:p-8 text-center text-slate-600 dark:text-slate-400">{row.val1}</td>
                                                            <td className="p-6 md:p-8 text-center text-xl font-bold text-primary bg-primary/5 dark:bg-primary/10">{row.val2}</td>
                                                            <td className="p-6 md:p-8 text-center text-slate-600 dark:text-slate-400">{row.val3}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </FadeIn>
                                </div >
                            </section >
                        );

                    case 'modern-stats':
                        return (
                            <section key={section.id} className="py-24 bg-slate-900 text-white relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                <div className="max-w-7xl mx-auto px-4 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                                        {(content.items || []).map((item: any, i: number) => (
                                            <FadeIn key={i} delay={i * 150} direction="up" >
                                                <div className="flex flex-col items-center">
                                                    {item.type === 'circle' ? (
                                                        <div className="relative mb-6">
                                                            <svg className="size-32 transform -rotate-90">
                                                                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                                                                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-primary" strokeDasharray={2 * Math.PI * 60} strokeDashoffset={2 * Math.PI * 60 * (1 - item.value / 100)} />
                                                            </svg>
                                                            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                                                                {item.value}<span className="text-sm align-top mt-1">{item.suffix}</span>
                                                            </div>
                                                        </div>
                                                    ) : item.type === 'bar' ? (
                                                        <div className="w-full text-center mb-6 px-4">
                                                            <div className="text-5xl font-black text-blue-400 mb-4">{item.value}{item.suffix}</div>
                                                            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                                                                <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" style={{ width: `${item.value}%` }}></div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center mb-6">
                                                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-lg">
                                                                {item.value}{item.suffix}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="text-sm uppercase tracking-[0.2em] font-bold text-slate-400">{item.label}</div>
                                                </div>
                                            </FadeIn>
                                        ))}
                                    </div>
                                </div>
                            </section >
                        );

                    case 'testimonials-slider':
                        return (
                            <section key={section.id} className="py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
                                <div className="max-w-7xl mx-auto px-4">
                                    <div className="text-center mb-16">
                                        <FadeIn direction="up">
                                            <span className="w-12 h-1 bg-primary block mx-auto mb-6 rounded-full"></span>
                                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">{content.title}</h2>
                                        </FadeIn>
                                    </div>
                                    <div className="flex gap-8 overflow-x-auto pb-12 px-4 snap-x scrollbar-hide">
                                        {(content.items || []).map((item: any, i: number) => (
                                            <div key={i} className="min-w-[350px] md:min-w-[400px] bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl snap-center relative" >
                                                <div className="text-6xl text-primary/20 font-serif absolute top-6 right-8">&quot;</div>
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="w-16 h-16 rounded-full bg-slate-200 bg-cover bg-center border-2 border-white dark:border-slate-700 shadow-md" style={{ backgroundImage: `url(${item.image})` }}></div>
                                                    <div>
                                                        <div className="font-bold text-lg text-slate-900 dark:text-white">{item.name}</div>
                                                        <div className="text-sm text-primary font-medium">{item.role}</div>
                                                    </div>
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-300 italic text-lg leading-relaxed relative z-10">
                                                    {item.quote}
                                                </p>
                                                <div className="flex gap-1 mt-6 text-yellow-500">
                                                    {[1, 2, 3, 4, 5].map(star => <span key={star} className="material-symbols-outlined text-sm fill-current">star</span>)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section >
                        );

                    case 'masonry-gallery':
                        return (
                            <section key={section.id} className="py-24 bg-background-light dark:bg-black">
                                <div className="max-w-7xl mx-auto px-4">
                                    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                        <div className="md:w-2/3">
                                            <FadeIn direction="up">
                                                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">{content.title}</h2>
                                                <p className="text-lg text-slate-600 dark:text-slate-400">{content.description}</p>
                                            </FadeIn>
                                        </div>
                                    </div>
                                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                                        {(content.images || []).map((img: string, i: number) => (
                                            <FadeIn key={i} delay={i * 50} direction="up">
                                                <div className="break-inside-avoid rounded-2xl overflow-hidden group relative cursor-zoom-in">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={img} alt="" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                        <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg">visibility</span>
                                                    </div>
                                                </div>
                                            </FadeIn>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        );

                    case 'features':
                        return (
                            <section key={section.id} className="py-20 px-6 bg-slate-50 dark:bg-slate-800">
                                <div className="max-w-6xl mx-auto">
                                    {content.title && (
                                        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">{content.title}</h2>
                                    )}
                                    <div className="grid md:grid-cols-3 gap-8">
                                        {(content.items || []).map((item: any, idx: number) => (
                                            <div key={idx} className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow" >
                                                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">{item.title}</h3>
                                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section >
                        );

                    default:
                        return <div key={section.id} className="hidden">Unsupported section type: {section.type}</div>;
                }
            })}
        </div >
    );
}
