import Link from "next/link";

export default function AdminPagesList() {
    const pages = [
        { id: 1, name: "Anasayfa", slug: "home", path: "/", lastUpdated: "2 saat önce", status: "Yayında" },
        { id: 2, name: "Kurumsal / Hakkımızda", slug: "about", path: "/hakkimizda", lastUpdated: "1 gün önce", status: "Yayında" },
        { id: 3, name: "Kurumsal / Misyon & Vizyon", slug: "mission", path: "/misyon-vizyon", lastUpdated: "5 gün önce", status: "Yayında" },
        { id: 4, name: "Hizmetlerimiz", slug: "services", path: "/hizmetlerimiz", lastUpdated: "3 gün önce", status: "Yayında" },
        { id: 5, name: "İletişim", slug: "contact", path: "/iletisim", lastUpdated: "1 hafta önce", status: "Yayında" },
    ];

    return (
        <div className="p-6 lg:p-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Sayfa Yönetimi</h1>
                    <p className="text-slate-500 dark:text-admin-text-muted mt-1 text-sm">Web sitenizdeki sayfaların içeriklerini buradan yönetebilirsiniz.</p>
                </div>

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
                                            <span className="font-medium text-slate-900 dark:text-white">{page.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600 dark:text-slate-400 font-mono">{page.path}</td>
                                    <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{page.lastUpdated}</td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                            {page.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link
                                            href={`/admin/pages/${page.slug}`}
                                            className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-primary/10"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">edit_note</span>
                                            Düzenle
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
