
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Page } from "@prisma/client";
import { deletePage, createPage } from "./actions";
import { requirePermission } from "@/lib/auth-checks";


// Form Component for creating new page
function CreatePageForm() {
    return (
        <form action={createPage} className="mb-8 p-6 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <h2 className="text-xl font-semibold mb-4">Yeni Sayfa Oluştur</h2>
            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="w-full md:flex-1">
                    <label className="block text-sm font-medium mb-1">Sayfa Başlığı</label>
                    <input
                        name="title"
                        required
                        placeholder="Örn: Hakkımızda"
                        className="w-full p-2 border rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                    />
                </div>
                <div className="w-full md:flex-1">
                    <label className="block text-sm font-medium mb-1">URL (Slug)</label>
                    <input
                        name="slug"
                        required
                        placeholder="Örn: hakkimizda"
                        className="w-full p-2 border rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium shrink-0"
                >
                    Oluştur & Düzenle
                </button>
            </div>
        </form>
    )
}

export default async function BuilderPage() {
    await requirePermission("manage_pages");
    // Prisma henüz migrate edilmemişse hata verebilir, try-catch ile sarmak iyi olur
    let pages: Page[] = [];
    try {
        pages = await prisma.page.findMany({
            orderBy: { updatedAt: "desc" },
        });
    } catch (e) {
        console.error("Database connection failed or pending migrations:", e);
        // Hata durumunda boş dizi döner, UI'da uyarı gösterebiliriz
    }

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-5xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Sayfa Yönetimi</h1>
                    <p className="text-sm md:text-base text-gray-500 mt-2">Web sitesi sayfalarını buradan oluşturup düzenleyebilirsiniz.</p>
                </div>
            </div>

            <CreatePageForm />

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Başlık</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">URL</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Durum</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-gray-700">
                            {pages.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-gray-500">
                                        Henüz hiç sayfa oluşturulmamış. Yukarıdan yeni bir sayfa ekleyin.
                                    </td>
                                </tr>
                            ) : (
                                pages.map((page) => (
                                    <tr key={page.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                        <td className="py-3 px-4 font-medium">{page.title}</td>
                                        <td className="py-3 px-4 text-gray-500 font-mono text-sm">/{page.slug}</td>
                                        <td className="py-3 px-4">
                                            {page.isPublished ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                    Yayında
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                    Taslak
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                                            <Link
                                                href={`/admin/builder/${page.id}`}
                                                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                            >
                                                Düzenle
                                            </Link>
                                            <form action={deletePage.bind(null, page.id)} className="inline-block">
                                                <button className="text-red-500 hover:text-red-700 text-sm ml-3">
                                                    Sil
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
