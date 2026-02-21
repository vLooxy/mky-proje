
import Link from "next/link";

export function BlogCard({
    badge,
    badgeColor,
    image,
    date,
    readTime,
    title,
    snippet,
    author,
    slug,
}: {
    badge: string;
    badgeColor: string;
    image: string;
    date: string;
    readTime: string;
    title: string;
    snippet: string;
    author: string;
    slug?: string;
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
                        href={slug ? `/blog/${slug}` : "/"}
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
