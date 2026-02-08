import { FadeIn } from "@/components/ui/FadeIn";

interface BlogHeroProps {
    title?: string;
    subtitle?: string;
    description?: string;
    badge?: string;
    backgroundImage?: string;
}

export function BlogHero({
    title = "HABERLER & <span class='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400'>İÇGÖRÜLER</span>",

    description = "Uzman ekibimizden iş sağlığı standartları, yapısal mühendislik yenilikleri ve güvenlik uyumluluğu hakkında en son güncellemeler.",
    badge = "Güncel Gelişmeler",
    backgroundImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuBFDZyr-QNmb3k0yeL9-kTCDYGJof1QqCXYrDrlQOVE6dKq-EbkCzcmSudJlInLrvVvhpTAJPvdz381JS2P759lk24ODLmrU6q3GvRVAEyO2tqrun4dIsEjJgZt6tMPJMazoC9eQRk6A4R8T02NgjDzCJOFdUgk4WHcjdgxvfmx4M5HvzZohuan5uEVQwTwxZDk1fX83BZoajPIIXbeqzWaEd0a4MuoV2pzLdtq8v_0nFroFNqBv77n4D3GbaETWJYJ8kVZ8gFFjQ0"
}: BlogHeroProps) {
    return (
        <header className="relative w-full pt-48 pb-32 overflow-hidden bg-[#101922]">
            <div className="absolute inset-0 z-0 opacity-20">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${backgroundImage}')`,
                    }}
                ></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#101922] to-transparent z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
                <FadeIn delay={100} direction="up">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
                        {badge}
                    </span>
                </FadeIn>
                <FadeIn delay={200} direction="up">
                    <h1
                        className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </FadeIn>
                <FadeIn delay={300} direction="up">
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
                        {description}
                    </p>
                </FadeIn>
            </div>
        </header>
    );
}
