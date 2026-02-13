import Link from "next/link";
import { prisma } from "@/lib/db";
import { PagesTable } from "@/components/admin/pages/PagesTable";

export const dynamic = 'force-dynamic';

export default async function AdminPagesList() {
    const pages = await prisma.page.findMany({
        orderBy: { slug: 'asc' }
    });

    return (
        <div className="p-6 lg:p-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Sayfa Yönetimi</h1>
                        <p className="text-slate-500 dark:text-admin-text-muted mt-1 text-sm">Web sitenizdeki sayfaların içeriklerini buradan yönetebilirsiniz.</p>
                    </div>
                    <Link href="/admin/builder" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Yeni Sayfa Oluştur
                    </Link>
                </div>

                <PagesTable pages={pages} />
            </div>
        </div>
    );
}
