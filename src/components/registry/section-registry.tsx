import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Loading placeholder
const SectionLoading = () => <div className="w-full h-32 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg my-8" />;

// Helper for cleaner dynamic imports
const dynamicSection = (importFunc: () => Promise<any>, componentName?: string) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return dynamic(
        () => importFunc().then(mod => componentName ? mod[componentName] : mod.default || mod),
        { loading: SectionLoading }
    );
};

export const SECTION_REGISTRY: Record<string, ComponentType<any>> = { // eslint-disable-line @typescript-eslint/no-explicit-any
    // --- HOME PAGE SPECIFIC COMPONENTS ---
    'home-hero': dynamicSection(() => import('@/components/features/home/HeroSection'), 'HeroSection'),
    'home-stats': dynamicSection(() => import('@/components/features/home/StatsSection'), 'StatsSection'),
    'home-services': dynamicSection(() => import('@/components/features/home/ServicesSection'), 'ServicesSection'),
    'home-projects': dynamicSection(() => import('@/components/features/home/ProjectsSection'), 'ProjectsSection'),
    'home-cta': dynamicSection(() => import('@/components/features/home/CTASection'), 'CTASection'),
    'hero-modern': dynamicSection(() => import('@/components/features/home/HomeModernHero'), 'HomeModernHero'),

    // --- FEATURE PAGES ---
    'about-purpose': dynamicSection(() => import('@/components/features/about/AboutPurpose'), 'AboutPurpose'),
    'mission-hero': dynamicSection(() => import('@/components/features/mission/MissionHero'), 'MissionHero'),
    'trust-indicators': dynamicSection(() => import('@/components/features/services/TrustIndicators'), 'TrustIndicators'),

    // --- BLOG ---
    'blog-hero': dynamicSection(() => import('@/components/features/blog/BlogHero'), 'BlogHero'),
    'blog-content': dynamicSection(() => import('@/components/features/blog/BlogContent'), 'BlogContent'),

    // --- CONTACT ---
    'contact-hero': dynamicSection(() => import('@/components/features/contact/ContactHero'), 'ContactHero'),
    'contact-content': dynamicSection(() => import('@/components/features/contact/ContactContent'), 'ContactContent'),

    // --- UI/SHARED ---
    'page-header': dynamicSection(() => import('@/components/ui/PageHeader'), 'PageHeader'),

    // --- SECTIONS (Formerly Inline) ---
    'layered-content': dynamicSection(() => import('@/components/sections/LayeredContent'), 'LayeredContent'),
    'values-grid': dynamicSection(() => import('@/components/sections/ValuesGrid'), 'ValuesGrid'),
    'timeline': dynamicSection(() => import('@/components/sections/Timeline'), 'Timeline'),
    'team-grid': dynamicSection(() => import('@/components/sections/TeamGrid'), 'TeamGrid'),
    'hero': dynamicSection(() => import('@/components/sections/SimpleHero'), 'SimpleHero'),
    'text': dynamicSection(() => import('@/components/sections/TextSection'), 'TextSection'),
    'stats-section': dynamicSection(() => import('@/components/sections/StatsSectionVariant'), 'StatsSectionVariant'),
    'cta-banner': dynamicSection(() => import('@/components/sections/CtaBanner'), 'CtaBanner'),
    'trust-logos': dynamicSection(() => import('@/components/sections/TrustLogos'), 'TrustLogos'),
    'services-grid': dynamicSection(() => import('@/components/sections/ServicesGrid'), 'ServicesGrid'),
    'projects-slider': dynamicSection(() => import('@/components/sections/ProjectsSlider'), 'ProjectsSlider'),
    'featured-case': dynamicSection(() => import('@/components/sections/FeaturedCase'), 'FeaturedCase'),
    'contact-block': dynamicSection(() => import('@/components/sections/ContactBlock'), 'ContactBlock'),
    'blog-grid': dynamicSection(() => import('@/components/sections/BlogGrid'), 'BlogGrid'),
    'faq-accordion': dynamicSection(() => import('@/components/sections/FaqAccordion'), 'FaqAccordion'),
    'comparison-table': dynamicSection(() => import('@/components/sections/ComparisonTable'), 'ComparisonTable'),
    'modern-stats': dynamicSection(() => import('@/components/sections/ModernStats'), 'ModernStats'),
    'testimonials-slider': dynamicSection(() => import('@/components/sections/TestimonialsSlider'), 'TestimonialsSlider'),
    'masonry-gallery': dynamicSection(() => import('@/components/sections/MasonryGallery'), 'MasonryGallery'),
    'features': dynamicSection(() => import('@/components/sections/FeaturesGrid'), 'FeaturesGrid'),
};
