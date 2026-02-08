/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react';
import { SectionType, SECTION_TEMPLATES, EditorSection } from './types';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableSection } from './SortableSection';
import { savePageContent, updatePageStatus } from '@/app/admin/(dashboard)/builder/actions';

// Kategoriler için tip tanımı
interface ComponentCategory {
    id: string;
    title: string;
    items: {
        type: SectionType;
        label: string;
        icon: string;
    }[];
}

// Kategori Verisi
const COMPONENT_CATEGORIES: ComponentCategory[] = [
    {
        id: 'heroes',
        title: 'Hero Bölümleri',
        items: [
            { type: 'hero', label: 'Standart Hero', icon: '🖼️' },
            { type: 'home-hero', label: 'Ana Hero', icon: '🏠' },
            { type: 'mission-hero', label: 'Misyon Hero', icon: '🚀' },
            { type: 'blog-hero', label: 'Blog Hero', icon: '📰' },
            { type: 'contact-hero', label: 'İletişim Hero', icon: '📞' },
            { type: 'hero-modern', label: 'Modern Hero Template', icon: '🚀' },
        ]
    },
    {
        id: 'content',
        title: 'İçerik Blokları',
        items: [
            { type: 'text', label: 'Metin Bloğu', icon: '📝' },
            { type: 'blog-content', label: 'Blog İçerik', icon: '📝' },
            { type: 'layered-content', label: 'Katmanlı İçerik', icon: '📑' },
            { type: 'values-grid', label: 'Değerler Grid', icon: '💎' },
            { type: 'about-purpose', label: 'Hakkımızda (Amaç)', icon: '🎯' },
            { type: 'timeline', label: 'Zaman Çizelgesi', icon: '⏳' },
        ]
    },
    {
        id: 'lists',
        title: 'Listeler & Gridler',
        items: [
            { type: 'home-services', label: 'Ana Hizmetler', icon: '🛠️' },
            { type: 'home-projects', label: 'Ana Projeler', icon: '🏗️' },
            { type: 'services-grid', label: 'Hizmet Grid', icon: '🛠️' },
            { type: 'blog-grid', label: 'Blog Listesi', icon: '📰' },
            { type: 'team-grid', label: 'Ekip Grid', icon: '👥' },
        ]
    },
    {
        id: 'cta',
        title: 'CTA & Banner',
        items: [
            { type: 'home-cta', label: 'Ana CTA', icon: '📢' },
            { type: 'cta-banner', label: 'CTA Banner', icon: '📢' },
        ]
    },
    {
        id: 'contact',
        title: 'İletişim',
        items: [
            { type: 'contact-content', label: 'İletişim Form', icon: '📝' },
            { type: 'contact-block', label: 'İletişim Formu', icon: '📞' },
        ]
    },
    {
        id: 'modern',
        title: ' ✨ Yeni Modern Bileşenler',
        items: [
            { type: 'faq-accordion', label: 'S.S.S. (Accordion)', icon: '❓' },
            { type: 'comparison-table', label: 'Karşılaştırma Tablosu', icon: '⚖️' },
            { type: 'modern-stats', label: 'Modern İstatistikler', icon: '📈' },
            { type: 'testimonials-slider', label: 'Müşteri Yorumları', icon: '💬' },
            { type: 'masonry-gallery', label: 'Masonry Galeri', icon: '🖼️' },
        ]
    },
    {
        id: 'other',
        title: 'Diğer Bileşenler',
        items: [
            { type: 'home-stats', label: 'Ana İstatistikler', icon: '📊' },
            { type: 'trust-indicators', label: 'Güven Logoları', icon: '🏆' },
            { type: 'page-header', label: 'Sayfa Başlığı', icon: '🏁' },
            { type: 'stats-section', label: 'İstatistikler', icon: '📊' },
            { type: 'projects-slider', label: 'Projeler Slider', icon: '🏗️' },
            { type: 'trust-logos', label: 'Referans Logoları', icon: '🤝' },
            { type: 'featured-case', label: 'Öne Çıkan Vaka', icon: '⭐' },
        ]
    }
];

interface PageBuilderEditorProps {
    page: any; // Type from Prisma
}

export function PageBuilderEditor({ page }: PageBuilderEditorProps) {
    const [sections, setSections] = useState<EditorSection[]>(
        page.sections.map((s: any) => ({
            ...s,
            content: typeof s.content === 'string' ? JSON.parse(s.content) : s.content
        }))
    );
    const [isSaving, setIsSaving] = useState(false);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [openCategory, setOpenCategory] = useState<string | null>('heroes');
    const [isPublished, setIsPublished] = useState(page.isPublished); // New state
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAddSection = (type: SectionType) => {
        const newSection: EditorSection = {
            id: crypto.randomUUID(),
            type,
            content: SECTION_TEMPLATES[type],
            order: sections.length,
            isNew: true
        };
        setSections([...sections, newSection]);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setSections((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const updateSectionContent = (id: string, newContent: any) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, content: newContent } : s));
    };

    const handleDeleteSection = (id: string) => {
        setSections(prev => prev.filter(s => s.id !== id));
        if (selectedSectionId === id) setSelectedSectionId(null);
    }

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await savePageContent(page.id, {
                title: page.title,
                slug: page.slug,
                sections: sections // Content is already object, action handles stringify
            });
            alert('Kaydedildi!');
        } catch (e) {
            console.error(e);
            alert('Hata oluştu');
        } finally {
            setIsSaving(false);
        }
    };

    const selectedSection = sections.find(s => s.id === selectedSectionId);

    return (
        <div className="flex h-[calc(100vh-100px)] gap-4">
            {/* Sol Panel: Araçlar */}
            <div className="w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col overflow-y-auto">
                <h3 className="font-semibold mb-4 text-sm text-gray-500 uppercase">Bileşenler</h3>

                <div className="space-y-2">
                    {COMPONENT_CATEGORIES.map((category) => (
                        <div key={category.id} className="border border-gray-100 dark:border-gray-700/50 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                                className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    {category.title}
                                </span>
                                <span className={`transform transition-transform duration-200 text-gray-400 ${openCategory === category.id ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {openCategory === category.id && (
                                <div className="p-2 space-y-1 bg-white dark:bg-gray-800">
                                    {category.items.map((item) => (
                                        <button
                                            key={item.type}
                                            onClick={() => handleAddSection(item.type)}
                                            className="w-full p-2 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 rounded-md flex gap-2 items-center text-sm transition-colors group"
                                        >
                                            <span className="text-base group-hover:scale-110 transition-transform">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-auto pt-4 space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                            DURUM: {isPublished ? <span className="text-emerald-500">YAYINDA</span> : <span className="text-gray-400">TASLAK</span>}
                        </span>
                        <button
                            onClick={async () => {
                                const newState = !isPublished;
                                setIsPublished(newState);
                                await updatePageStatus(page.id, newState);
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isPublished ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPublished ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                </div>
            </div>

            {/* Orta Panel: Canvas */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-900/50 rounded-lg p-8 overflow-y-auto border border-dashed border-gray-300 dark:border-gray-700 relative">
                <div className="max-w-4xl mx-auto bg-white dark:bg-black min-h-full shadow-lg rounded-sm">
                    {mounted ? (
                        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={sections} strategy={verticalListSortingStrategy}>
                                {sections.map((section) => (
                                    <SortableSection
                                        key={section.id}
                                        section={section}
                                        isSelected={section.id === selectedSectionId}
                                        onClick={() => setSelectedSectionId(section.id)}
                                        onDelete={() => handleDeleteSection(section.id)}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    ) : (
                        <div className="p-8 text-center text-gray-500">Editör yükleniyor...</div>
                    )}
                </div>
            </div>

            {/* Sağ Panel: Özellikler */}
            {selectedSection && (
                <div className="w-80 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-y-auto">
                    <h3 className="font-semibold mb-4 text-sm text-gray-500 uppercase border-b pb-2">Düzenle: {selectedSection.type}</h3>

                    <div className="space-y-4">
                        {/* Dynamic Form Fields based on content keys */}
                        {Object.keys(selectedSection.content).map((key) => {
                            const value = selectedSection.content[key];

                            // Array handling (Lists)
                            if (Array.isArray(value)) {
                                return (
                                    <div key={key}>
                                        <label className="block text-xs font-semibold mb-2 uppercase text-gray-400">{key}</label>
                                        <div className="space-y-2">
                                            {value.map((item: any, i: number) => (
                                                <div key={i} className="p-2 border rounded bg-gray-50 dark:bg-gray-900 text-xs">
                                                    {typeof item === 'object' ? (
                                                        // Object in Array
                                                        <div className="space-y-2">
                                                            {Object.keys(item).map(subKey => (
                                                                <div key={subKey}>
                                                                    <span className="text-[10px] text-gray-400 uppercase">{subKey}</span>
                                                                    <input
                                                                        className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none"
                                                                        value={item[subKey]} // Simple edit only for string props
                                                                        onChange={(e) => {
                                                                            const newItems = [...value];
                                                                            newItems[i] = { ...newItems[i], [subKey]: e.target.value };
                                                                            updateSectionContent(selectedSection.id, { ...selectedSection.content, [key]: newItems });
                                                                        }}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        // String in Array
                                                        <input
                                                            className="w-full bg-transparent focus:outline-none"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const newItems = [...value];
                                                                newItems[i] = e.target.value;
                                                                updateSectionContent(selectedSection.id, { ...selectedSection.content, [key]: newItems });
                                                            }}
                                                        />
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            const newItems = value.filter((_: any, index: number) => index !== i);
                                                            updateSectionContent(selectedSection.id, { ...selectedSection.content, [key]: newItems });
                                                        }}
                                                        className="mt-2 w-full text-[10px] text-red-500 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 rounded py-1 flex items-center justify-center gap-1 transition-all"
                                                    >
                                                        <span>🗑️</span> Sil
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                className="text-xs text-blue-500 hover:underline"
                                                onClick={() => {
                                                    // Add empty item structure based on existing or default
                                                    const template = value.length > 0 ? (typeof value[0] === 'object' ? Object.keys(value[0]).reduce((acc, k) => ({ ...acc, [k]: '' }), {}) : "") : "";
                                                    updateSectionContent(selectedSection.id, { ...selectedSection.content, [key]: [...value, template] });
                                                }}
                                            >
                                                + Yeni Ekle
                                            </button>
                                        </div>
                                    </div>
                                )
                            }

                            // Boolean Toggle
                            if (typeof value === 'boolean') {
                                return (
                                    <div key={key} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => updateSectionContent(selectedSection.id, { ...selectedSection.content, [key]: e.target.checked })}
                                        />
                                        <label className="text-sm font-medium">{key}</label>
                                    </div>
                                );
                            }

                            // Text/Textarea
                            return (
                                <div key={key}>
                                    <label className="block text-xs font-semibold mb-1 uppercase text-gray-400">{key}</label>
                                    {String(value).length > 50 || key === 'html' || key === 'description' ? (
                                        <textarea
                                            value={value}
                                            onChange={(e) => updateSectionContent(selectedSection.id, { ...selectedSection.content, [key]: e.target.value })}
                                            className="w-full p-2 border rounded text-sm h-24 dark:bg-gray-900 dark:border-gray-700"
                                        />
                                    ) : (
                                        <input
                                            value={value}
                                            onChange={(e) => updateSectionContent(selectedSection.id, { ...selectedSection.content, [key]: e.target.value })}
                                            className="w-full p-2 border rounded text-sm dark:bg-gray-900 dark:border-gray-700"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
