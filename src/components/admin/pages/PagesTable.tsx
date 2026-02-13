import React from 'react';
import Link from "next/link";

interface PagesTableProps {
    pages: {
        id: string;
        title: string;
        slug: string;
        updatedAt: Date | string;
        isPublished: boolean;
    }[];
}

export function PagesTable({ pages }: PagesTableProps) {
    return (
        <div className="bg-admin-card dark:bg-admin-card-dark rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">SAYFA ADI</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">YOL (PATH)</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">SON GÜNCELLEME</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">DURUM</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">İŞLEMLER</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {pages.map((page) => (
                        <tr key={page.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <span className="material-symbols-outlined text-xl">web</span>
                                    </div>
                                    <span className="font-medium text-slate-900 dark:text-white">{page.title}</span>
                                </div>
                            </td>
                            <td className="p-4 text-sm text-slate-600 dark:text-slate-400 font-mono">/{page.slug}</td>
                            <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                                {new Date(page.updatedAt).toLocaleDateString("tr-TR", {
                                    day: "numeric",
                                    month: "long",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </td>
                            <td className="p-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${page.isPublished
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                    }`}>
                                    {page.isPublished ? "Yayında" : "Taslak"}
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <Link
                                    href={`/admin/builder/${page.id}`}
                                    className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-primary/10"
                                >
                                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                                    Düzenle
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {pages.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-8 text-center text-slate-500">
                                Henüz hiç sayfa oluşturulmamış. &quot;Yeni Sayfa Oluştur&quot; butonu ile başlayın.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
