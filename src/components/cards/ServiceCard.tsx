import Link from "next/link";

export function ServiceCard({
    icon,
    title,
    description,
}: {
    icon: string;
    title: string;
    description: string;
}) {
    return (
        <div className="group flex flex-col rounded-xl bg-white dark:bg-[#1a2634] p-6 shadow-sm border border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300 h-full">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[28px]">{icon}</span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#111418] dark:text-white">
                {title}
            </h3>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {description}
            </p>
            <Link
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors mt-auto"
                href="/"
            >
                Daha Fazla Bilgi{" "}
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                    arrow_forward
                </span>
            </Link>
        </div>
    );
}
