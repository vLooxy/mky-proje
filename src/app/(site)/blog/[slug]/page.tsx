import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const slug = (await params).slug;

    const post = await prisma.blog.findUnique({
        where: { slug },
    });

    if (!post) return { title: 'Yazı Bulunamadı' };

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            images: [post.image || ''],
        }
    }
}

function calculateReadingTime(content: string) {
    const wpm = 225;
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return `${time} dk okuma`;
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;

    const post = await prisma.blog.findUnique({
        where: { slug: slug, isPublished: true },
        include: {
            category: true
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;

    if (!post) {
        notFound();
    }

    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
        : post.createdAt.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

    const readTime = post.readTime || calculateReadingTime(post.content);

    return (
        <article className="bg-background-light dark:bg-background-dark min-h-screen pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-8 transition-colors"
                >
                    <span className="material-symbols-outlined text-sm mr-1">arrow_back</span>
                    Tüm Yazılara Dön
                </Link>

                {/* Header Section */}
                <header className="mb-12 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                        {post.category && (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${post.category.color.replace('bg-', 'bg-') || 'bg-blue-500'}`}>
                                {post.category.name}
                            </span>
                        )}
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 gap-2">
                            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                            <time dateTime={post.publishedAt?.toISOString() || post.createdAt.toISOString()}>{formattedDate}</time>
                            <span className="mx-1">•</span>
                            <span className="material-symbols-outlined text-[18px]">schedule</span>
                            <span>{readTime}</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                        <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-400">person</span>
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-slate-900 dark:text-white">
                                {post.author || "Engisafe Ekibi"}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Yazar
                            </p>
                        </div>
                    </div>
                </header>

                {/* Hero Image */}
                {post.image && (
                    <figure className="mb-12 rounded-2xl overflow-hidden shadow-xl aspect-video relative">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </figure>
                )}

                {/* Main Content */}
                <div className="prose prose-lg dark:prose-invert prose-blue max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Tags Section */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Etiketler:</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-slate-100 dark:bg-[#1a2632] text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
