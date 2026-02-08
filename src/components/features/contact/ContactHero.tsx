
import { FadeIn } from "@/components/ui/FadeIn";

interface ContactHeroProps {
    title?: string;
    subtitle?: string;
    description?: string;
    badge?: string;
    backgroundImage?: string;
}

export function ContactHero({
    title = "BİZE <span class='text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400'>ULAŞIN</span>",
    description = "İSG danışmanlığı, yapısal mühendislik soruları veya proje teklifi istemek için uzman ekibimize ulaşın.",
    badge = "Yardım etmek için buradayız",
    backgroundImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDbiEf3-dxxxW6ry5B7urPbpLud0tO1NG8MNYRInTh2FyPbYuHsdcE-p2gcy6N9kG-LdXHWZFjYtJvxQcFPDPtRBiYE-2HzAjp6-ww23INfXhjHfy4bW9iMfum_kB7BArcQYFOkPx1xJVveW_5b0i1otJqFpRCpMvxDztfJZFpnDGfEFPboa4BJDR6IYce5AvAiJpBCjJtTcXFzZrzKDmCfRcksesqgnDH45a0KgBj4DcBsR28N0FC_9pj8bw4YQeUGas9Bl_1diZc"
}: ContactHeroProps) {
    return (
        <header className="relative w-full min-h-[500px] h-auto flex items-center justify-center overflow-hidden bg-slate-900 pb-20">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-background-light dark:to-background-dark"></div>
            <div className="relative z-10 text-center max-w-4xl px-4 pt-32">
                <FadeIn direction="up" delay={100}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm w-fit mb-6 mx-auto">
                        <span className="material-symbols-outlined text-primary text-sm">
                            support_agent
                        </span>
                        <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">
                            {badge}
                        </span>
                    </div>
                </FadeIn>
                <FadeIn direction="up" delay={200}>
                    <h1
                        className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </FadeIn>
                <FadeIn direction="up" delay={300}>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
                        {description}
                    </p>
                </FadeIn>
            </div>
        </header>
    );
}
