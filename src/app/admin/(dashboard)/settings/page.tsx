"use client";

import { useState, useEffect, useTransition } from "react";
import { getSettings, updateSettings } from "@/actions/settings-actions";
import { LinkListEditor } from "@/components/admin/settings/LinkListEditor";
import { cn } from "@/lib/utils";
import { Settings } from "@/types/settings";

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();
    const [activeTab, setActiveTab] = useState<'general' | 'header' | 'footer'>('general');

    useEffect(() => {
        async function loadSettings() {
            try {
                const data = await getSettings();
                setSettings(data);
            } catch (error) {
                console.error("Failed to load settings", error);
            } finally {
                setLoading(false);
            }
        }
        loadSettings();
    }, []);

    const handleChange = (section: keyof Settings, key: string, value: string) => {
        setSettings((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                [section]: {
                    ...prev[section] as any, // eslint-disable-line @typescript-eslint/no-explicit-any
                    [key]: value
                }
            };
        });
    };

    const handleObjectChange = (section: keyof Settings, newData: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        setSettings((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                [section]: newData
            };
        });
    };

    const handleSave = () => {
        if (!settings) return;
        startTransition(async () => {
            const result = await updateSettings(settings as any); // eslint-disable-line @typescript-eslint/no-explicit-any
            if (result.success) {
                alert("Ayarlar başarıyla kaydedildi!");
            } else {
                alert("Ayarlar kaydedilirken hata oluştu.");
            }
        });
    };

    if (loading) return <div className="p-10">Yükleniyor...</div>;
    if (!settings) return <div className="p-10">Ayarlar yüklenemedi.</div>;

    const tabs = [
        { id: 'general', label: 'Genel & İletişim', icon: 'settings' },
        { id: 'header', label: 'Header & Menü', icon: 'menu' },
        { id: 'footer', label: 'Footer & Sosyal', icon: 'vertical_align_bottom' },
    ];

    return (
        <div className="p-6 lg:p-10">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Ayarlar</h1>
                        <p className="text-slate-500 dark:text-admin-text-muted mt-1 text-sm">Web sitesi genel ayarlarını buradan yönetebilirsiniz.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isPending}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 self-start"
                    >
                        <span className="material-symbols-outlined">save</span>
                        {isPending ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as 'general' | 'header' | 'footer')}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium transition-colors whitespace-nowrap",
                                activeTab === tab.id
                                    ? "border-primary text-primary"
                                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            )}
                        >
                            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="bg-admin-card dark:bg-admin-card-dark rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 space-y-6">

                    {/* GENERAL TAB */}
                    {activeTab === 'general' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">web</span>
                                    Site Bilgileri
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Site Başlığı</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-admin-bg-dark px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            value={settings.site?.title || ''}
                                            onChange={(e) => handleChange('site', 'title', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Site Açıklaması</label>
                                        <textarea
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-admin-bg-dark px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]"
                                            value={settings.site?.description || ''}
                                            onChange={(e) => handleChange('site', 'description', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Telif Hakkı Metni</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-admin-bg-dark px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            value={settings.site?.copyright || ''}
                                            onChange={(e) => handleChange('site', 'copyright', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-200 dark:border-slate-700" />

                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">contact_support</span>
                                    İletişim Bilgileri
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Adres</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-admin-bg-dark px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            value={settings.contact?.address || ''}
                                            onChange={(e) => handleChange('contact', 'address', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Telefon</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-admin-bg-dark px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            value={settings.contact?.phone || ''}
                                            onChange={(e) => handleChange('contact', 'phone', e.target.value)}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">E-posta</label>
                                        <input
                                            type="email"
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-admin-bg-dark px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            value={settings.contact?.email || ''}
                                            onChange={(e) => handleChange('contact', 'email', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* HEADER TAB */}
                    {activeTab === 'header' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">menu</span>
                                    Ana Menü
                                </h2>
                                <p className="text-sm text-gray-500 mb-4">Header&apos;da görünecek menü öğelerini düzenleyin. Sürükleyerek sırasını değiştirebilirsiniz.</p>

                                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <LinkListEditor
                                        items={settings.header?.navItems || []}
                                        allowNesting={true}
                                        onChange={(newItems) => {
                                            const newHeader = { ...settings.header, navItems: newItems };
                                            handleObjectChange('header', newHeader);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FOOTER TAB */}
                    {activeTab === 'footer' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">share</span>
                                    Sosyal Medya Linkleri
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['linkedin', 'twitter', 'instagram', 'facebook', 'youtube'].map(social => (
                                        <div key={social}>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 capitalize">{social}</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-admin-bg-dark px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                value={settings.social?.[social] || ''}
                                                onChange={(e) => {
                                                    const newSocial = { ...settings.social, [social]: e.target.value };
                                                    handleObjectChange('social', newSocial);
                                                }}
                                                placeholder={`https://${social}.com/...`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-slate-200 dark:border-slate-700" />

                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">view_column</span>
                                    Footer Link Sütunları
                                </h2>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {(settings.footer?.columns || []).map((col, colIndex) => (
                                        <div key={colIndex} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                            <div className="flex justify-between items-center mb-4">
                                                <input
                                                    className="bg-transparent font-bold text-slate-900 dark:text-white border-b border-transparent hover:border-slate-300 focus:border-primary focus:outline-none"
                                                    value={col.title}
                                                    onChange={(e) => {
                                                        const newCols = [...(settings.footer?.columns || [])];
                                                        if (newCols[colIndex]) {
                                                            newCols[colIndex] = { ...newCols[colIndex], title: e.target.value };
                                                            handleObjectChange('footer', { ...settings.footer, columns: newCols });
                                                        }
                                                    }}
                                                />
                                                <button
                                                    onClick={() => {
                                                        const newCols = (settings.footer?.columns || []).filter((_, i) => i !== colIndex);
                                                        handleObjectChange('footer', { ...settings.footer, columns: newCols });
                                                    }}
                                                    className="text-red-400 hover:text-red-500 text-xs"
                                                >
                                                    Sütunu Sil
                                                </button>
                                            </div>

                                            <LinkListEditor
                                                items={col.links || []}
                                                onChange={(newLinks) => {
                                                    const newCols = [...(settings.footer?.columns || [])];
                                                    if (newCols[colIndex]) {
                                                        newCols[colIndex] = { ...newCols[colIndex], links: newLinks };
                                                        handleObjectChange('footer', { ...settings.footer, columns: newCols });
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => {
                                            const newCols = [...(settings.footer?.columns || []), { title: "Yeni Sütun", links: [] }];
                                            handleObjectChange('footer', { ...settings.footer, columns: newCols });
                                        }}
                                        className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-3xl mb-2">add</span>
                                        <span className="font-bold">Yeni Sütun Ekle</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
