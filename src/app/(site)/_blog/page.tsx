import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { getBlogPosts } from "@/actions/blog-actions";

// Tell Next.js to revalidate this page every minute or strictly dynamic
export const revalidate = 60;

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="flex flex-col min-h-screen">
            <header className="relative w-full py-32 overflow-hidden bg-[#101922]">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFDZyr-QNmb3k0yeL9-kTCDYGJof1QqCXYrDrlQOVE6dKq-EbkCzcmSudJlInLrvVvhpTAJPvdz381JS2P759lk24ODLmrU6q3GvRVAEyO2tqrun4dIsEjJgZt6tMPJMazoC9eQRk6A4R8T02NgjDzCJOFdUgk4WHcjdgxvfmx4M5HvzZohuan5uEVQwTwxZDk1fX83BZoajPIIXbeqzWaEd0a4MuoV2pzLdtq8v_0nFroFNqBv77n4D3GbaETWJYJ8kVZ8gFFjQ0')",
                        }}
                    ></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#101922] to-transparent z-0"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
                    <FadeIn delay={100} direction="up">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
                            Güncel Gelişmeler
                        </span>
                    </FadeIn>
                    <FadeIn delay={200} direction="up">
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                            HABERLER & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">İÇGÖRÜLER</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={300} direction="up">
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
                            Uzman ekibimizden iş sağlığı standartları, yapısal mühendislik
                            yenilikleri ve güvenlik uyumluluğu hakkında en son güncellemeler.
                        </p>
                    </FadeIn>
                </div>
            </header>

            <main className="flex-grow w-full py-12 md:py-16 bg-background-light dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn delay={400} direction="up">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                            <div className="flex flex-wrap items-center gap-2">
                                <button className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors">
                                    Tüm Yazılar
                                </button>
                                {["Güvenlik İpuçları", "Mühendislik Trendleri", "Uyumluluk", "Vaka Çalışmaları"].map((tag, i) => (
                                    <button key={i} className="px-5 py-2.5 rounded-full bg-white dark:bg-[#1a2632] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-sm font-medium transition-colors">
                                        {tag}
                                    </button>
                                ))}
                            </div>
                            <div className="relative w-full md:w-72 group">
                                <input
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2632] text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm transition-all shadow-sm group-hover:shadow-md"
                                    placeholder="İçgörülerde ara..."
                                    type="text"
                                />
                                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl group-focus-within:text-primary transition-colors">
                                    search
                                </span>
                            </div>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any, i: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                            <FadeIn key={post.id || i} delay={i * 100} direction="up" className="h-full">
                                <BlogCard {...post} />
                            </FadeIn>
                        ))}
                    </div>

                    <div className="mt-16 flex justify-center">
                        <FadeIn direction="up" delay={600}>
                            <nav aria-label="Pagination" className="flex items-center gap-2">
                                <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold flex items-center justify-center shadow-lg shadow-blue-500/25">
                                    1
                                </button>
                                <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </nav>
                        </FadeIn>
                    </div>
                </div>
            </main>
        </div>
    );
}

function BlogCard({
    badge,
    badgeColor,
    image,
    date,
    readTime,
    title,
    snippet,
    author,
}: {
    badge: string;
    badgeColor: string;
    image: string;
    date: string;
    readTime: string;
    title: string;
    snippet: string;
    author: string;
}) {
    return (
        <article className="flex flex-col bg-white dark:bg-[#1a2632] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-slate-100 dark:border-slate-800 transition-all duration-300 group h-full">
            <div className="relative h-56 overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                    <span
                        className={`px-3 py-1 ${badgeColor} backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm`}
                    >
                        {badge}
                    </span>
                </div>
                <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url('${image}')` }}
                ></div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
                    <span className="material-symbols-outlined text-sm">
                        calendar_today
                    </span>
                    <span>{date}</span>
                    <span className="mx-1">•</span>
                    <span>{readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                    {title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {snippet}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <div className="w-full h-full text-slate-400 flex items-center justify-center">
                                <span className="material-symbols-outlined text-sm">person</span>
                            </div>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                            {author}
                        </span>
                    </div>
                    <Link
                        className="text-primary hover:text-blue-600 font-bold text-sm flex items-center gap-1 group/link"
                        href="/"
                    >
                        Oku{" "}
                        <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">
                            arrow_forward
                        </span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
