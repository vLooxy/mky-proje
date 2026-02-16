"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { getPageData, updatePageData } from "@/actions/page-actions";

export default function PageEditor() {
    interface PageData {
        title?: string;
        content?: string;
        hero?: {
            badge?: string;
            title_line1?: string;
            title_highlight?: string;
            description?: string;
            button_primary?: string;
            button_secondary?: string;
            backgroundImage?: string;
            [key: string]: string | undefined;
        };
        [key: string]: unknown;
    }

    interface FormField {
        key: string;
        label: string;
        type: string;
        value: string | undefined;
    }

    interface SectionConfig {
        id: string;
        title: string;
        fields: FormField[];
    }

    const params = useParams();
    const slug = params.slug as string;
    const [pageData, setPageData] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    // Load data
    useEffect(() => {
        async function loadData() {
            if (!slug) return;
            try {
                const data = await getPageData(slug);
                setPageData(data as PageData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [slug]);

    // Define section configurations for the UI
    // In a real CMS these would be defined in a schema, here we map them manually to the data structure
    const getSectionsConfig = (data: PageData): SectionConfig[] => {
        if (slug === 'home') {
            return [
                {
                    id: 'hero',
                    title: 'Hero Alanı (Giriş)',
                    fields: [
                        { key: 'hero.badge', label: 'Rozet Metni', type: 'text', value: data?.hero?.badge },
                        { key: 'hero.title_line1', label: 'Başlık (Satır 1)', type: 'text', value: data?.hero?.title_line1 },
                        { key: 'hero.title_highlight', label: 'Başlık (Vurgulu)', type: 'text', value: data?.hero?.title_highlight },
                        { key: 'hero.description', label: 'Açıklama', type: 'textarea', value: data?.hero?.description },
                        { key: 'hero.button_primary', label: 'Birinci Buton', type: 'text', value: data?.hero?.button_primary },
                        { key: 'hero.button_secondary', label: 'İkinci Buton', type: 'text', value: data?.hero?.button_secondary },
                        { key: 'hero.backgroundImage', label: 'Arkaplan Görseli (URL)', type: 'text', value: data?.hero?.backgroundImage },
                    ]
                },
                // We can add other sections here later (stats, etc)
            ];
        } else if (slug === 'about') {
            return [
                {
                    id: 'main',
                    title: 'Genel İçerik',
                    fields: [
                        { key: 'main.title', label: 'Sayfa Başlığı', type: 'text', value: data?.title },
                        { key: 'main.content', label: 'İçerik', type: 'textarea', value: data?.content },
                    ]
                }
            ];
        }
        // Fallback or other pages
        return [];
    };

    const sections = pageData ? getSectionsConfig(pageData) : [];
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({ hero: true });
    const [formData, setFormData] = useState<Record<string, unknown>>({});

    // Initialize form data when pageData loads
    useEffect(() => {
        if (pageData) {
            // Deep copy to avoid reference issues
            setFormData(JSON.parse(JSON.stringify(pageData)));
        }
    }, [pageData]);

    const toggleSection = (id: string) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleInputChange = (sectionId: string, fieldKey: string, value: string) => {
        // Support nested keys (hero.title) and potential flat keys (title)
        if (fieldKey.includes('.')) {
            const [parent, child] = fieldKey.split('.');
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent] || {},
                    [child]: value
                }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [fieldKey]: value
            }));
        }
    };

    const handleSave = () => {
        startTransition(async () => {
            const result = await updatePageData(slug, formData);
            if (result.success) {
                alert("Değişiklikler başarıyla kaydedildi!");
            } else {
                alert("Kaydetme sırasında bir hata oluştu.");
            }
        });
    };

    if (loading) {
        return <div className="p-10 text-center">Yükleniyor...</div>;
    }

    if (!pageData) {
        return (
            <div className="p-10 flex flex-col items-center justify-center gap-4">
                <p className="text-lg text-slate-500">Veri bulunamadı veya bu sayfa henüz yapılandırılmamış.</p>
                <Link href="/admin/pages" className="text-primary hover:underline">Geri Dön</Link>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-10">
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/admin/pages" className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{slug === 'home' ? 'Anasayfa' : slug}</h1>
                            <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-500">/{slug}</span>
                        </div>
                        <p className="text-slate-500 dark:text-admin-text-muted text-sm">Bu sayfanın içerik alanlarını aşağıdan düzenleyebilirsiniz.</p>
                    </div>
                    <div className="ml-auto flex gap-3">
                        <button className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm transition-colors">
                            Önizle
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isPending}
                            className="px-5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium text-sm shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
                        >
                            {isPending ? (
                                <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                            ) : (
                                <span className="material-symbols-outlined text-[18px]">save</span>
                            )}
                            {isPending ? 'Kaydediliyor...' : 'Kaydet'}
                        </button>
                    </div>
                </div>

                {/* Editor Sections */}
                <div className="flex flex-col gap-6">
                    {sections.length > 0 ? (
                        sections.map((section: SectionConfig) => (
                            <div key={section.id} className="bg-admin-card dark:bg-admin-card-dark rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                                <button
                                    onClick={() => toggleSection(section.id)}
                                    className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                                >
                                    <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
                                        <span className="material-symbols-outlined text-primary">splitscreen</span>
                                        {section.title}
                                    </div>
                                    <span className={`material-symbols-outlined text-slate-400 transition-transform ${openSections[section.id] ? 'rotate-180' : ''}`}>
                                        expand_more
                                    </span>
                                </button>

                                {openSections[section.id] && (
                                    <div className="p-6 space-y-5 bg-white dark:bg-admin-card-dark">
                                        {section.fields.map((field: FormField, idx: number) => {
                                            // Access current value from formData state
                                            const [parent, child] = field.key.split('.');
                                            const currentValue = (formData[parent] as Record<string, string>)?.[child] ?? '';

                                            return (
                                                <div key={idx}>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                        {field.label}
                                                    </label>
                                                    {field.type === 'textarea' ? (
                                                        <textarea
                                                            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder-slate-400 min-h-[100px]"
                                                            value={currentValue}
                                                            onChange={(e) => handleInputChange(section.id, field.key, e.target.value)}
                                                        />
                                                    ) : (
                                                        <input
                                                            type={field.type}
                                                            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder-slate-400"
                                                            value={currentValue}
                                                            onChange={(e) => handleInputChange(section.id, field.key, e.target.value)}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                            <p className="text-slate-500 dark:text-slate-400">Bu sayfa için henüz düzenlenebilir alan tanımlanmamış (/src/data/pages.json dosyasını kontrol edin).</p>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
}
