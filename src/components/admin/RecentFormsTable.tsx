import React from 'react';
import FormActions from "@/components/admin/FormActions";

interface RecentFormsTableProps {
    forms: {
        id: string;
        name: string;
        email: string;
        phone?: string | null;
        subject: string;
        message: string;
        createdAt: Date;
        status: string;
        fileName?: string | null;
    }[];
}

export function RecentFormsTable({ forms }: RecentFormsTableProps) {
    // Sort forms by date (newest first)
    const recentForms = [...forms].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

    return (
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
                                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap text-center">DOSYA</th>
                                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap text-right">İŞLEMLER</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {recentForms.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">Henüz başvuru yok.</td>
                                </tr>
                            ) : (
                                recentForms.map((form) => (
                                    <tr key={form.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="p-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-sm">
                                                    {form.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white text-sm">{form.name}</p>
                                                    <p className="text-slate-500 text-xs">{form.email}</p>
                                                    <p className="text-slate-500 text-xs">{form.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                            {form.subject === 'general' ? 'Genel Bilgi' :
                                                form.subject === 'proposal' ? 'Teklif İste' :
                                                    form.subject === 'audit_request' ? 'İSG Denetim Talebi' :
                                                        form.subject === 'engineering' ? 'Mühendislik Danışmanlığı' :
                                                            form.subject === 'career' ? 'Kariyer' : form.subject}
                                        </td>
                                        <td className="p-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            {new Date(form.createdAt).toLocaleDateString('tr-TR')}
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
                                        <td className="p-4 whitespace-nowrap text-center">
                                            {form.fileName ? (
                                                <a
                                                    href={`/api/contact/download/${form.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/40 transition-all active:scale-95"
                                                    title={form.fileName || "Dosyayı İndir"}
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">download</span>
                                                    İndir
                                                </a>
                                            ) : (
                                                <span className="text-slate-400 text-xs">-</span>
                                            )}
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
    );
}
