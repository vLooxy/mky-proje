import { requirePermission } from "@/lib/auth-checks";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
    await requirePermission("manage_media");
    // Assuming getMedia() is defined elsewhere or will be added.
    // For now, I'll comment it out to avoid a reference error if it's not provided.
    // const { media } = await getMedia();
    return (
        <div className="p-6 lg:p-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Medya Kütüphanesi</h1>
                    <p className="text-slate-500 dark:text-admin-text-muted mt-1 text-sm">Görsellerinizi ve dosyalarınızı yönetin.</p>
                </div>

                <div className="flex flex-col items-center justify-center p-20 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-admin-bg-dark text-center">
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                        <span className="material-symbols-outlined text-4xl text-slate-400">imagesmode</span>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">Henüz görsel yüklenmemiş</h3>
                    <p className="text-slate-500 dark:text-admin-text-muted text-sm mt-1 mb-6 max-w-sm">Buraya yeni görseller yükleyerek blog yazılarınızda ve sayfalarınızda kullanabilirsiniz.</p>
                    <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-primary/20 transition-all active:scale-95">
                        Yeni Görsel Yükle
                    </button>
                </div>
            </div>
        </div>
    );
}
