import { getBlogPosts } from "@/actions/blog-actions";
import BlogPostForm from "@/components/admin/blog/BlogPostForm";
import { getCurrentUser } from "@/actions/auth-actions";
import { notFound } from "next/navigation";

interface BlogEditPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function BlogEditPage({ params }: BlogEditPageProps) {
    const { id } = await params;
    const [posts, user] = await Promise.all([
        getBlogPosts(),
        getCurrentUser()
    ]);
    const post = posts.find((p) => p.id === id);
    const isAdmin = user?.role?.name === "Yönetici";

    if (!post) {
        notFound();
    }

    return (
        <div className="p-6 lg:p-10">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Yazıyı Düzenle</h1>
                    <p className="text-slate-500 dark:text-admin-text-muted mt-1 text-sm">Blog yazısını güncelleyin ve yayınlayın.</p>
                </div>

                <div className="bg-admin-card dark:bg-admin-card-dark rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 lg:p-8">
                    <BlogPostForm post={post} isAdmin={isAdmin} />
                </div>
            </div>
        </div>
    );
}
