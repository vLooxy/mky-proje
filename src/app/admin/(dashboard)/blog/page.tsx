import { getBlogPosts } from "@/actions/blog-actions";
import { getCategories } from "@/actions/category-actions";
import Link from "next/link";
import { BlogPostsTable } from "@/components/admin/blog/BlogPostsTable";


export default async function AdminBlogPage() {
    const posts = await getBlogPosts();
    const categories = await getCategories();

    return (
        <div className="p-6 lg:p-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Blog Yönetimi</h1>
                        <p className="text-slate-500 dark:text-admin-text-muted mt-1 text-sm">Mühendislik ve güvenlik makalelerinizi oluşturun, düzenleyin ve yönetin.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/admin/blog/categories" className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold leading-normal transition-all">
                            <span className="material-symbols-outlined text-[20px]">category</span>
                            <span>Kategoriler</span>
                        </Link>
                        <Link href="/admin/blog/new" className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:bg-primary/90 text-white text-sm font-bold leading-normal shadow-lg shadow-primary/20 transition-all">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            <span>Yeni Yazı Ekle</span>
                        </Link>
                    </div>
                </div>

                {/* Filter Section (UI Only for now) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-admin-card dark:bg-admin-card-dark p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="md:col-span-5 lg:col-span-6">
                        <label className="flex w-full items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-admin-bg-dark px-3 py-2 focus-within:border-primary transition-colors">
                            <span className="material-symbols-outlined text-slate-400">search</span>
                            <input
                                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                                placeholder="Başlık, yazar ile ara..."
                                type="text"
                            />
                        </label>
                    </div>
                    {/* ... (Other filters kept same for visuals) ... */}
                </div>

                {/* Blog Posts Table */}
                <BlogPostsTable posts={posts} categories={categories} />
            </div>
        </div>
    );
}
