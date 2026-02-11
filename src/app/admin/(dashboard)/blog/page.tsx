import { getBlogPosts } from "@/actions/blog-actions";
import { getCategories } from "@/actions/category-actions";
import { BlogActionButtons } from "@/components/admin/blog/BlogActionButtons";
import Link from "next/link";
import Image from "next/image";


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
                <div className="bg-admin-card dark:bg-admin-card-dark rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-500 dark:text-admin-text-muted">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-700 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 w-[10%]" scope="col">GÖRSEL</th>
                                    <th className="px-6 py-4 w-[30%]" scope="col">BAŞLIK</th>
                                    <th className="px-6 py-4" scope="col">KATEGORİ</th>
                                    <th className="px-6 py-4" scope="col">YAZAR</th>
                                    <th className="px-6 py-4" scope="col">TARİH</th>
                                    <th className="px-6 py-4" scope="col">DURUM</th>
                                    <th className="px-6 py-4 text-right" scope="col">İŞLEMLER</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {posts.length > 0 ? (
                                    posts.map((post: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                                        <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="w-16 h-10 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-700">
                                                    {post.image ? (
                                                        <div className="relative w-full h-full">
                                                            <Image
                                                                src={post.image}
                                                                alt={post.title}
                                                                fill
                                                                className="object-cover"
                                                                unoptimized
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                            <span className="material-symbols-outlined text-[20px]">image</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900 dark:text-white text-base">{post.title}</div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">/blog/{post.slug}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {(() => {
                                                    const category = categories.find(c => c.id === post.categoryId);
                                                    return (
                                                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium border ${category ? category.color.replace('bg-', 'text- border-').replace('/90', '') + '/20' : 'text-slate-700 border-slate-200'}`}>
                                                            {category ? category.name : 'Genel'}
                                                        </span>
                                                    );
                                                })()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                                                        {post.author ? post.author.charAt(0) : 'A'}
                                                    </div>
                                                    <span>{post.author || 'Anonim'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{post.date}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                                                    {post.status === 'draft' ? 'Taslak' : 'Yayınlandı'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <BlogActionButtons postId={post.id} />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                            Henüz hiç blog yazısı bulunmuyor.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
