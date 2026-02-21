import React from 'react';
import Image from "next/image";
import { BlogActionButtons } from "@/components/admin/blog/BlogActionButtons";

import { BlogPost } from "@/types/blog";

interface BlogPostsTableProps {
    posts: BlogPost[];
    categories: {
        id: string;
        name: string;
        color: string;
    }[];
    canDelete: boolean;
}

export function BlogPostsTable({ posts, categories, canDelete }: BlogPostsTableProps) {
    return (
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
                            posts.map((post) => (
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
                                            const category = categories.find((c) => c.id === post.categoryId);
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
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ${post.isPublished
                                            ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                                            }`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${post.isPublished ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-slate-500 dark:bg-slate-400'}`}></span>
                                            {post.isPublished ? 'Yayınlandı' : 'Taslak'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <BlogActionButtons postId={post.id} canDelete={canDelete} />
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
    );
}
