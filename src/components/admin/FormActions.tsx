"use client";

import { useState, useTransition } from "react";
import { deleteForm, updateFormStatus } from "@/actions/form-actions";

type FormActionsProps = {
    form: {
        id: string;
        name: string;
        email: string; // Changed from company
        subject: string; // Changed from service
        message: string;
        createdAt: Date; // Changed from date
        status: string;
    };
};

export default function FormActions({ form }: FormActionsProps) {
    const [isPending, startTransition] = useTransition();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        if (confirm("Bu başvuruyu silmek istediğinize emin misiniz?")) {
            startTransition(async () => {
                await deleteForm(form.id);
            });
        }
    };

    const handleView = () => {
        setShowModal(true);
        if (form.status === 'pending') {
            startTransition(async () => {
                await updateFormStatus(form.id, 'reviewed');
            });
        }
    };

    return (
        <>
            <div className="flex items-center justify-end gap-2">
                <button
                    onClick={handleView}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 p-1.5 rounded-lg transition-colors"
                    title="Görüntüle"
                >
                    <span className="material-symbols-outlined text-sm font-semibold">visibility</span>
                </button>
                <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 p-1.5 rounded-lg transition-colors disabled:opacity-50"
                    title="Sil"
                >
                    <span className="material-symbols-outlined text-sm font-semibold">delete</span>
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 shrink-0">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Başvuru Detayı</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-4 overflow-y-auto">
                            <div>
                                <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1 block">Ad / Firma</label>
                                <p className="text-slate-900 dark:text-white font-medium">{form.name}</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{form.email}</p>
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1 block">Hizmet</label>
                                <div className="inline-block px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 text-sm font-medium">
                                    {form.subject === 'general' ? 'Genel Bilgi' :
                                        form.subject === 'proposal' ? 'Teklif İste' :
                                            form.subject === 'audit_request' ? 'İSG Denetim Talebi' :
                                                form.subject === 'engineering' ? 'Mühendislik Danışmanlığı' :
                                                    form.subject === 'career' ? 'Kariyer' : form.subject}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1 block">Mesaj</label>
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                                        {form.message || "Mesaj yok."}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1 block">Tarih</label>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    {new Date(form.createdAt).toLocaleString('tr-TR', { dateStyle: 'full', timeStyle: 'short' })}
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 shrink-0">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium text-sm"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
