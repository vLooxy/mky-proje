import { getBlogPosts } from "@/actions/blog-actions";

import { getForms } from "@/actions/form-actions";
import { getAnalytics } from "@/actions/analytics-actions";
import FormActions from "@/components/admin/FormActions";

export default async function AdminDashboard() {
    // 1. Fetch Real Data
    const posts = await getBlogPosts();

    const forms = await getForms();
    const analytics = await getAnalytics();

    // 2. Calculate Stats
    const publishedPostCount = posts.filter((p: any) => p.status === 'published').length; // eslint-disable-line @typescript-eslint/no-explicit-any

    const newRequestCount = forms.filter((f: any) => f.status === 'pending').length; // eslint-disable-line @typescript-eslint/no-explicit-any
    const totalVisits = analytics.totalVisits || 0;

    // Sort forms by date (newest first)
    const recentForms = [...forms].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5); // eslint-disable-line @typescript-eslint/no-explicit-any

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
                    {/* Card 1: Total Visits */}
                    <div className="bg-admin-card dark:bg-admin-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-40 group hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Toplam Ziyaret</p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{totalVisits.toLocaleString()}</h3>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-primary">
                                <span className="material-symbols-outlined">trending_up</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                            <span className="text-slate-400 text-xs">Genel görüntülenme</span>
                        </div>
                    </div>

                    {/* Card 2: New Requests */}
                    <div className="bg-admin-card dark:bg-admin-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-40 group hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Bekleyen Talepler</p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{newRequestCount}</h3>
                            </div>
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
                                <span className="material-symbols-outlined">group_add</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                            <span className="text-slate-400 text-xs">Form başvuruları</span>
                        </div>
                    </div>

                    {/* Card 3: Published Blogs */}
                    <div className="bg-admin-card dark:bg-admin-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-40 group hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Yayınlanan Bloglar</p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{publishedPostCount}</h3>
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                                <span className="material-symbols-outlined">rss_feed</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                            <span className="text-slate-400 text-xs">Yayındaki makaleler</span>
                        </div>
                    </div>
                </div>

                {/* Recent Applications Table */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Son Form Başvuruları</h2>
                    </div>
                    <div className="bg-admin-card dark:bg-admin-card-dark rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">AD / FİRMA</th>
                                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">İLGİLENİLEN HİZMET</th>
                                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">TARİH</th>
                                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">DURUM</th>
                                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap text-right">İŞLEMLER</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {recentForms.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-slate-500">Henüz başvuru yok.</td>
                                        </tr>
                                    ) : (
                                        recentForms.map((form: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                                            <tr key={form.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="p-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-sm">
                                                            {form.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-slate-900 dark:text-white text-sm">{form.name}</p>
                                                            <p className="text-slate-500 text-xs">{form.company}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                                    {form.service === 'risk_analysis' ? 'Risk Analizi' :
                                                        form.service === 'safety_audit' ? 'Güvenlik Denetimi' :
                                                            form.service === 'training' ? 'Eğitim' : form.service}
                                                </td>
                                                <td className="p-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                                    {new Date(form.date).toLocaleDateString('tr-TR')}
                                                </td>
                                                <td className="p-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${form.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                        form.status === 'reviewed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {form.status === 'pending' ? 'Beklemede' :
                                                            form.status === 'reviewed' ? 'İncelendi' : form.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 whitespace-nowrap text-right">
                                                    <FormActions form={form} />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
