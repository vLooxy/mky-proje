"use client";

import { useState, useEffect, useTransition } from "react";
import { getSettings, updateSettings } from "@/actions/settings-actions";
import { LinkListEditor } from "@/components/admin/settings/LinkListEditor";
import { cn } from "@/lib/utils";
import { Settings } from "@/types/settings";
import defaultSettings from "@/data/settings.json";

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();
    const [activeTab, setActiveTab] = useState<'general' | 'header' | 'footer' | 'appearance'>('general');

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
                    ...prev[section] as Record<string, string>,
                    [key]: value
                }
            };
        });
    };

    const handleObjectChange = (section: keyof Settings, newData: unknown) => {
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
            const result = await updateSettings(settings as unknown as typeof defaultSettings);
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
        { id: 'appearance', label: 'Görünüm', icon: 'palette' },
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
                            onClick={() => setActiveTab(tab.id as 'general' | 'header' | 'footer' | 'appearance')}
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

                    {/* APPEARANCE TAB */}
                    {activeTab === 'appearance' && (
                        <div className="space-y-8">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">palette</span>
                                        Tema Ayarları
                                    </h2>
                                    <button
                                        onClick={() => {
                                            if (confirm("Tema ayarlarını varsayılan hale getirmek istediğinize emin misiniz?")) {
                                                const defaultTheme = {
                                                    fontDisplay: "Inter",
                                                    fontBody: "Inter",
                                                    radius: "0.5rem",
                                                    colors: {
                                                        light: {
                                                            primary: "#137fec",
                                                            secondary: "#64748b",
                                                            background: "#f6f7f8",
                                                            surface: "#ffffff",
                                                            text: "#111418",
                                                            success: "#22c55e",
                                                            error: "#ef4444",
                                                            warning: "#f59e0b",
                                                            info: "#3b82f6"
                                                        },
                                                        dark: {
                                                            primary: "#137fec",
                                                            secondary: "#94a3b8",
                                                            background: "#101922",
                                                            surface: "#1a2634",
                                                            text: "#ffffff",
                                                            success: "#22c55e",
                                                            error: "#ef4444",
                                                            warning: "#f59e0b",
                                                            info: "#3b82f6"
                                                        }
                                                    }
                                                };
                                                handleObjectChange('theme', defaultTheme);
                                            }
                                        }}
                                        className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-lg">restore</span>
                                        Varsayılanlara Dön
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Typography Section */}
                                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-base">text_fields</span>
                                            Yazı Tipleri
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Başlık Yazı Tipi (Display Font)</label>
                                                <select
                                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-admin-bg-dark px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                    value={settings.theme?.fontDisplay || 'Inter'}
                                                    onChange={(e) => {
                                                        const newTheme = { ...settings.theme, fontDisplay: e.target.value };
                                                        handleObjectChange('theme', newTheme);
                                                    }}
                                                >
                                                    <option value="Inter">Inter</option>
                                                    <option value="Roboto">Roboto</option>
                                                    <option value="Open Sans">Open Sans</option>
                                                    <option value="Montserrat">Montserrat</option>
                                                    <option value="Poppins">Poppins</option>
                                                    <option value="Lato">Lato</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Gövde Yazı Tipi (Body Font)</label>
                                                <select
                                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-admin-bg-dark px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                    value={settings.theme?.fontBody || 'Inter'}
                                                    onChange={(e) => {
                                                        const newTheme = { ...settings.theme, fontBody: e.target.value };
                                                        handleObjectChange('theme', newTheme);
                                                    }}
                                                >
                                                    <option value="Inter">Inter</option>
                                                    <option value="Roboto">Roboto</option>
                                                    <option value="Open Sans">Open Sans</option>
                                                    <option value="Montserrat">Montserrat</option>
                                                    <option value="Poppins">Poppins</option>
                                                    <option value="Lato">Lato</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Colors Section */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Light Mode Colors */}
                                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                                                <span className="material-symbols-outlined text-yellow-500">light_mode</span>
                                                <h3 className="font-bold text-slate-900">Aydınlık Mod (Light)</h3>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-500 mb-1">Ana Renk (Primary)</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="color"
                                                            className="w-10 h-10 p-0.5 rounded border border-slate-200 cursor-pointer"
                                                            value={settings.theme?.colors?.light?.primary || '#137fec'}
                                                            onChange={(e) => {
                                                                const newTheme = {
                                                                    ...settings.theme,
                                                                    colors: {
                                                                        ...settings.theme?.colors,
                                                                        light: { ...settings.theme?.colors?.light, primary: e.target.value }
                                                                    }
                                                                } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                        <span className="text-sm font-mono text-slate-600 uppercase">{settings.theme?.colors?.light?.primary || '#137fec'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-500 mb-1">İkincil Renk (Secondary)</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="color"
                                                            className="w-10 h-10 p-0.5 rounded border border-slate-200 cursor-pointer"
                                                            value={settings.theme?.colors?.light?.secondary || '#64748b'}
                                                            onChange={(e) => {
                                                                const newTheme = {
                                                                    ...settings.theme,
                                                                    colors: {
                                                                        ...settings.theme?.colors,
                                                                        light: { ...settings.theme?.colors?.light, secondary: e.target.value }
                                                                    }
                                                                } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                        <span className="text-sm font-mono text-slate-600 uppercase">{settings.theme?.colors?.light?.secondary || '#64748b'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-500 mb-1">Arkaplan (Background)</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="color"
                                                            className="w-10 h-10 p-0.5 rounded border border-slate-200 cursor-pointer"
                                                            value={settings.theme?.colors?.light?.background || '#f6f7f8'}
                                                            onChange={(e) => {
                                                                const newTheme = {
                                                                    ...settings.theme,
                                                                    colors: {
                                                                        ...settings.theme?.colors,
                                                                        light: { ...settings.theme?.colors?.light, background: e.target.value }
                                                                    }
                                                                } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                        <span className="text-sm font-mono text-slate-600 uppercase">{settings.theme?.colors?.light?.background || '#f6f7f8'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-500 mb-1">Kart/Yüzey (Surface)</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="color"
                                                            className="w-10 h-10 p-0.5 rounded border border-slate-200 cursor-pointer"
                                                            value={settings.theme?.colors?.light?.surface || '#ffffff'}
                                                            onChange={(e) => {
                                                                const newTheme = {
                                                                    ...settings.theme,
                                                                    colors: {
                                                                        ...settings.theme?.colors,
                                                                        light: { ...settings.theme?.colors?.light, surface: e.target.value }
                                                                    }
                                                                } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                        <span className="text-sm font-mono text-slate-600 uppercase">{settings.theme?.colors?.light?.surface || '#ffffff'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-500 mb-1">Metin (Text)</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="color"
                                                            className="w-10 h-10 p-0.5 rounded border border-slate-200 cursor-pointer"
                                                            value={settings.theme?.colors?.light?.text || '#111418'}
                                                            onChange={(e) => {
                                                                const newTheme = {
                                                                    ...settings.theme,
                                                                    colors: {
                                                                        ...settings.theme?.colors,
                                                                        light: { ...settings.theme?.colors?.light, text: e.target.value }
                                                                    }
                                                                } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                        <span className="text-sm font-mono text-slate-600 uppercase">{settings.theme?.colors?.light?.text || '#111418'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-slate-100">
                                                <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Durum Renkleri</h4>
                                                <div className="grid grid-cols-4 gap-2">
                                                    <div>
                                                        <label className="block text-[10px] font-medium text-slate-500 mb-1">Başarılı</label>
                                                        <input type="color" className="w-full h-8 p-0.5 rounded border border-slate-200 cursor-pointer"
                                                            value={settings.theme?.colors?.light?.success || '#22c55e'}
                                                            onChange={(e) => {
                                                                const newTheme = { ...settings.theme, colors: { ...settings.theme?.colors, light: { ...settings.theme?.colors?.light, success: e.target.value } } } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-medium text-slate-500 mb-1">Hata</label>
                                                        <input type="color" className="w-full h-8 p-0.5 rounded border border-slate-200 cursor-pointer"
                                                            value={settings.theme?.colors?.light?.error || '#ef4444'}
                                                            onChange={(e) => {
                                                                const newTheme = { ...settings.theme, colors: { ...settings.theme?.colors, light: { ...settings.theme?.colors?.light, error: e.target.value } } } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-medium text-slate-500 mb-1">Uyarı</label>
                                                        <input type="color" className="w-full h-8 p-0.5 rounded border border-slate-200 cursor-pointer"
                                                            value={settings.theme?.colors?.light?.warning || '#f59e0b'}
                                                            onChange={(e) => {
                                                                const newTheme = { ...settings.theme, colors: { ...settings.theme?.colors, light: { ...settings.theme?.colors?.light, warning: e.target.value } } } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-medium text-slate-500 mb-1">Bilgi</label>
                                                        <input type="color" className="w-full h-8 p-0.5 rounded border border-slate-200 cursor-pointer"
                                                            value={settings.theme?.colors?.light?.info || '#3b82f6'}
                                                            onChange={(e) => {
                                                                const newTheme = { ...settings.theme, colors: { ...settings.theme?.colors, light: { ...settings.theme?.colors?.light, info: e.target.value } } } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dark Mode Colors */}
                                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-sm">
                                            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                                                <span className="material-symbols-outlined text-blue-400">dark_mode</span>
                                                <h3 className="font-bold text-white">Karanlık Mod (Dark)</h3>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-400 mb-1">Ana Renk (Primary)</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="color"
                                                            className="w-10 h-10 p-0.5 rounded border border-slate-700 bg-slate-800 cursor-pointer"
                                                            value={settings.theme?.colors?.dark?.primary || '#137fec'}
                                                            onChange={(e) => {
                                                                const newTheme = {
                                                                    ...settings.theme,
                                                                    colors: {
                                                                        ...settings.theme?.colors,
                                                                        dark: { ...settings.theme?.colors?.dark, primary: e.target.value }
                                                                    }
                                                                } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                        <span className="text-sm font-mono text-slate-300 uppercase">{settings.theme?.colors?.dark?.primary || '#137fec'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-400 mb-1">İkincil Renk (Secondary)</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="color"
                                                            className="w-10 h-10 p-0.5 rounded border border-slate-700 bg-slate-800 cursor-pointer"
                                                            value={settings.theme?.colors?.dark?.secondary || '#94a3b8'}
                                                            onChange={(e) => {
                                                                const newTheme = {
                                                                    ...settings.theme,
                                                                    colors: {
                                                                        ...settings.theme?.colors,
                                                                        dark: { ...settings.theme?.colors?.dark, secondary: e.target.value }
                                                                    }
                                                                } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                        <span className="text-sm font-mono text-slate-300 uppercase">{settings.theme?.colors?.dark?.secondary || '#94a3b8'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-400 mb-1">Arkaplan (Background)</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="color"
                                                            className="w-10 h-10 p-0.5 rounded border border-slate-700 bg-slate-800 cursor-pointer"
                                                            value={settings.theme?.colors?.dark?.background || '#101922'}
                                                            onChange={(e) => {
                                                                const newTheme = {
                                                                    ...settings.theme,
                                                                    colors: {
                                                                        ...settings.theme?.colors,
                                                                        dark: { ...settings.theme?.colors?.dark, background: e.target.value }
                                                                    }
                                                                } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                        <span className="text-sm font-mono text-slate-300 uppercase">{settings.theme?.colors?.dark?.background || '#101922'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-400 mb-1">Kart/Yüzey (Surface)</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="color"
                                                            className="w-10 h-10 p-0.5 rounded border border-slate-700 bg-slate-800 cursor-pointer"
                                                            value={settings.theme?.colors?.dark?.surface || '#1a2634'}
                                                            onChange={(e) => {
                                                                const newTheme = {
                                                                    ...settings.theme,
                                                                    colors: {
                                                                        ...settings.theme?.colors,
                                                                        dark: { ...settings.theme?.colors?.dark, surface: e.target.value }
                                                                    }
                                                                } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                        <span className="text-sm font-mono text-slate-300 uppercase">{settings.theme?.colors?.dark?.surface || '#1a2634'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-400 mb-1">Metin (Text)</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="color"
                                                            className="w-10 h-10 p-0.5 rounded border border-slate-700 bg-slate-800 cursor-pointer"
                                                            value={settings.theme?.colors?.dark?.text || '#ffffff'}
                                                            onChange={(e) => {
                                                                const newTheme = {
                                                                    ...settings.theme,
                                                                    colors: {
                                                                        ...settings.theme?.colors,
                                                                        dark: { ...settings.theme?.colors?.dark, text: e.target.value }
                                                                    }
                                                                } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                        <span className="text-sm font-mono text-slate-300 uppercase">{settings.theme?.colors?.dark?.text || '#ffffff'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-slate-800">
                                                <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Durum Renkleri</h4>
                                                <div className="grid grid-cols-4 gap-2">
                                                    <div>
                                                        <label className="block text-[10px] font-medium text-slate-400 mb-1">Başarılı</label>
                                                        <input type="color" className="w-full h-8 p-0.5 rounded border border-slate-700 bg-slate-800 cursor-pointer"
                                                            value={settings.theme?.colors?.dark?.success || '#22c55e'}
                                                            onChange={(e) => {
                                                                const newTheme = { ...settings.theme, colors: { ...settings.theme?.colors, dark: { ...settings.theme?.colors?.dark, success: e.target.value } } } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-medium text-slate-400 mb-1">Hata</label>
                                                        <input type="color" className="w-full h-8 p-0.5 rounded border border-slate-700 bg-slate-800 cursor-pointer"
                                                            value={settings.theme?.colors?.dark?.error || '#ef4444'}
                                                            onChange={(e) => {
                                                                const newTheme = { ...settings.theme, colors: { ...settings.theme?.colors, dark: { ...settings.theme?.colors?.dark, error: e.target.value } } } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-medium text-slate-400 mb-1">Uyarı</label>
                                                        <input type="color" className="w-full h-8 p-0.5 rounded border border-slate-700 bg-slate-800 cursor-pointer"
                                                            value={settings.theme?.colors?.dark?.warning || '#f59e0b'}
                                                            onChange={(e) => {
                                                                const newTheme = { ...settings.theme, colors: { ...settings.theme?.colors, dark: { ...settings.theme?.colors?.dark, warning: e.target.value } } } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-medium text-slate-400 mb-1">Bilgi</label>
                                                        <input type="color" className="w-full h-8 p-0.5 rounded border border-slate-700 bg-slate-800 cursor-pointer"
                                                            value={settings.theme?.colors?.dark?.info || '#3b82f6'}
                                                            onChange={(e) => {
                                                                const newTheme = { ...settings.theme, colors: { ...settings.theme?.colors, dark: { ...settings.theme?.colors?.dark, info: e.target.value } } } as unknown as Settings;
                                                                handleObjectChange('theme', newTheme);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Border Radius Section */}
                                    <div className="bg-white dark:bg-admin-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-base">rounded_corner</span>
                                            Kenar Yuvarlaklığı (Border Radius)
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-8 items-center">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Genel Yuvarlaklık Değeri</label>
                                                <div className="flex items-center gap-4">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="2"
                                                        step="0.125"
                                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                                                        value={parseFloat(settings.theme?.radius || '0.5') || 0.5}
                                                        onChange={(e) => {
                                                            const val = e.target.value + "rem";
                                                            const newTheme = { ...settings.theme, radius: val } as unknown as Settings;
                                                            handleObjectChange('theme', newTheme);
                                                        }}
                                                    />
                                                    <span className="font-mono text-sm text-slate-600 dark:text-slate-400 w-16 text-right">
                                                        {settings.theme?.radius || '0.5rem'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
                                                    <span>Keskin (0)</span>
                                                    <span>Normal (0.5)</span>
                                                    <span>Yuvarlak (2)</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-center">
                                                <div className="flex gap-4">
                                                    <button className="px-4 py-2 bg-primary text-white" style={{ borderRadius: settings.theme?.radius || '0.5rem' }}>Buton</button>
                                                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700" style={{ borderRadius: settings.theme?.radius || '0.5rem' }}></div>
                                                    <div className="px-4 py-2 border border-slate-300 dark:border-slate-600" style={{ borderRadius: settings.theme?.radius || '0.5rem' }}>Kart</div>
                                                </div>
                                            </div>
                                        </div>
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
