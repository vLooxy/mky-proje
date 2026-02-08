
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBlogPosts } from "@/actions/blog-actions";
import { BlogCard } from "@/components/cards/BlogCard";
import { FadeIn } from "@/components/ui/FadeIn";

interface BlogGridProps {
    title?: string;
    itemsPerPage?: number;
    showSearch?: boolean;
}

export async function BlogGrid({ title, itemsPerPage = 6 }: BlogGridProps) {
    const posts = (await getBlogPosts()) as any[];
    // Simple slice for now
    const displayPosts = posts.slice(0, itemsPerPage);

    return (
        <section className="py-20 px-4 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {title && (
                    <FadeIn direction="up">
                        <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">{title}</h2>
                    </FadeIn>
                )}
                {/* Simplified for brevity, will expand later if needed */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayPosts.map((post: any, i: number) => (
                        <FadeIn key={post.id || i} delay={i * 100} direction="up" className="h-full">
                            <BlogCard {...post} />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
