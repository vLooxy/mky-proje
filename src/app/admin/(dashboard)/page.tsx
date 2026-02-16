import { getBlogPosts } from "@/actions/blog-actions";
import { getForms } from "@/actions/form-actions";
import { getAnalytics } from "@/actions/analytics-actions";
import { AdminStatsCard } from "@/components/admin/AdminStatsCard";
import { RecentFormsTable } from "@/components/admin/RecentFormsTable";

export default async function AdminDashboard() {
    // 1. Fetch Real Data
    const posts = await getBlogPosts();
    const forms = await getForms();
    const analytics = await getAnalytics();

    // 2. Calculate Stats
    const publishedPostCount = posts.filter((p) => p.isPublished).length;
    const newRequestCount = forms.filter((f: any) => f.status === 'pending').length; // eslint-disable-line @typescript-eslint/no-explicit-any
    const totalVisits = analytics.totalVisits || 0;

    return (
        <div className="p-4 md:p-6 lg:p-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Yönetim Paneli Genel Bakış</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Tekrar hoş geldiniz, Admin. İşte bugünkü durum.</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AdminStatsCard
                        title="Toplam Ziyaret"
                        value={totalVisits.toLocaleString()}
                        icon="trending_up"
                        subtext="Genel görüntülenme"
                        color="blue"
                    />
                    <AdminStatsCard
                        title="Bekleyen Talepler"
                        value={newRequestCount}
                        icon="group_add"
                        subtext="Form başvuruları"
                        color="indigo"
                    />
                    <AdminStatsCard
                        title="Yayınlanan Bloglar"
                        value={publishedPostCount}
                        icon="rss_feed"
                        subtext="Yayındaki makaleler"
                        color="orange"
                    />
                </div>

                {/* Recent Applications Table */}
                <RecentFormsTable forms={forms} />
            </div>
        </div>
    );
}
