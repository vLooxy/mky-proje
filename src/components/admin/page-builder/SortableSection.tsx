
'use client'

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EditorSection } from './types';
import clsx from 'clsx';

interface SortableSectionProps {
    section: EditorSection;
    isSelected?: boolean;
    onClick: () => void;
    onDelete: () => void;
}

export function SortableSection({ section, isSelected, onClick, onDelete }: SortableSectionProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={clsx(
                "relative group mb-4 border-2 border-transparent transition-all",
                isSelected ? "border-blue-500 ring-2 ring-blue-500/20 z-10" : "hover:border-gray-300 dark:hover:border-gray-600"
            )}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            {/* Render Content Based on Type */}
            <div className="p-4 bg-white dark:bg-black pointer-events-none">
                {section.type === 'hero' && (
                    <div className="text-center py-10 bg-gray-100 dark:bg-gray-900 rounded">
                        {section.content.backgroundImage && (
                            <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${section.content.backgroundImage})` }} />
                        )}
                        <h1 className="text-4xl font-bold mb-4 relative z-10">{section.content.title}</h1>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded relative z-10">{section.content.buttonText}</button>
                    </div>
                )}

                {section.type === 'home-hero' && (
                    <div className="text-center py-20 bg-[#0B1120] text-white rounded relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                        <div className="inline-block px-3 py-1 mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] text-blue-300 uppercase tracking-widest">{section.content.badge}</div>
                        <h1 className="text-4xl font-black leading-none mb-4">
                            {section.content.title_line1}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{section.content.title_highlight}</span>
                        </h1>
                        <p className="text-xs text-slate-400 max-w-lg mx-auto">{section.content.description}</p>
                    </div>
                )}

                {section.type === 'home-stats' && (
                    <div className="grid grid-cols-4 gap-2 bg-white dark:bg-gray-800 p-4 rounded border-b">
                        {(section.content.items as { icon: string; value: string; subLabel: string }[] || []).map((item, i) => (
                            <div key={i} className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                                <span className="material-symbols-outlined text-blue-500 mb-1">{item.icon}</span>
                                <div className="text-lg font-black text-slate-800 dark:text-white leading-none">{item.value}</div>
                                <div className="text-[10px] text-slate-500 uppercase">{item.subLabel}</div>
                            </div>
                        ))}
                    </div>
                )}

                {section.type === 'home-services' && (
                    <div className="py-8 bg-white dark:bg-gray-800 p-4 rounded">
                        <div className="text-center mb-6">
                            <div className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">{section.content.subtitle}</div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{section.content.title}</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {(section.content.items as { icon: string; title: string; description: string }[] || []).map((item, i) => (
                                <div key={i} className="bg-gray-50 dark:bg-gray-900 p-4 rounded border dark:border-gray-700 hover:border-blue-500/50 transition-colors">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded flex items-center justify-center text-blue-600 mb-3">
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                    </div>
                                    <div className="font-bold text-sm mb-1">{item.title}</div>
                                    <div className="text-[10px] opacity-60 line-clamp-2">{item.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {section.type === 'home-projects' && (
                    <div className="py-8 bg-gray-50 dark:bg-gray-900 p-4 rounded">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h2 className="text-xl font-bold">{section.content.title}</h2>
                                <p className="text-xs opacity-60">{section.content.description}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {(section.content.items as { image: string; title: string; location: string }[] || []).map((item, i) => (
                                <div key={i} className="group relative aspect-video bg-gray-800 rounded overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className="absolute inset-0 bg-black/40"></div>
                                    <div className="absolute bottom-0 left-0 p-3 text-white">
                                        <div className="font-bold text-sm">{item.title}</div>
                                        <div className="text-[10px] opacity-70">{item.location}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {section.type === 'home-cta' && (
                    <div className="py-12 bg-blue-600 text-white text-center rounded relative overflow-hidden">
                        <div className="relative z-10 px-4">
                            <h2 className="text-2xl font-black mb-2">{section.content.title}</h2>
                            <p className="text-sm text-blue-100 max-w-lg mx-auto mb-6">{section.content.text}</p>
                            <div className="flex gap-2 justify-center">
                                <button className="bg-white text-blue-600 px-4 py-2 rounded font-bold text-xs">{section.content.buttonText}</button>
                                <button className="border border-white text-white px-4 py-2 rounded font-bold text-xs">{section.content.secondaryButtonText}</button>
                            </div>
                        </div>
                    </div>
                )}

                {section.type === 'about-purpose' && (
                    <div className="py-8 bg-white dark:bg-gray-800 p-4 rounded text-center">
                        <div className="text-[10px] text-blue-500 font-bold uppercase mb-1">{section.content.subtitle}</div>
                        <h2 className="text-xl font-bold mb-4">{section.content.title}</h2>
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
                                <div className="text-2xl mb-2">👁️</div>
                                <div className="font-bold text-sm">{section.content.visionTitle}</div>
                                <div className="text-[10px] opacity-60 line-clamp-2">{section.content.visionDesc}</div>
                            </div>
                            <div className="p-4 bg-blue-600 text-white rounded shadow">
                                <div className="text-2xl mb-2">🚀</div>
                                <div className="font-bold text-sm">{section.content.missionTitle}</div>
                                <div className="text-[10px] opacity-80 line-clamp-2">{section.content.missionDesc}</div>
                            </div>
                        </div>
                    </div>
                )}

                {section.type === 'mission-hero' && (
                    <div className="py-16 bg-[#F0F4F8] dark:bg-[#0B1120] text-center rounded relative overflow-hidden">
                        <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">{section.content.smallTitle}</h2>
                        <h1 className="text-4xl font-black leading-none mb-4 text-slate-900 dark:text-white">
                            {section.content.titleLine1}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">{section.content.titleLine2}</span><br />
                            {section.content.titleLine3}
                        </h1>
                    </div>
                )}

                {section.type === 'trust-indicators' && (
                    <div className="py-6 bg-white dark:bg-gray-800 rounded border-b border-gray-100 dark:border-gray-700 text-center">
                        <div className="text-[10px] uppercase text-gray-400 mb-3">{section.content.title}</div>
                        <div className="flex justify-center gap-6 opacity-60">
                            {(section.content.items as { icon: string; name: string }[] || []).map((item, i) => (
                                <div key={i} className="flex items-center gap-1 font-bold text-xs text-gray-500">
                                    <span className="material-symbols-outlined text-sm">{item.icon}</span>
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {section.type === 'blog-hero' && (
                    <div className="py-8 bg-[#101922] text-white text-center rounded relative overflow-hidden">
                        <div className="text-[10px] bg-blue-500/20 px-2 py-1 rounded-full inline-block mb-2 text-blue-300 border border-blue-500/20">{section.content.badge}</div>
                        <h2 className="text-xl font-black mb-2" dangerouslySetInnerHTML={{ __html: section.content.title }}></h2>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">{section.content.description}</p>
                    </div>
                )}

                {section.type === 'blog-content' && (
                    <div className="py-8 bg-gray-50 dark:bg-black rounded p-4">
                        <div className="flex gap-2 mb-4">
                            {['Tüm Yazılar', 'Güvenlik', 'Mühendislik'].map(t => <div key={t} className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-[10px] border shadow-sm">{t}</div>)}
                        </div>
                        <div className="grid grid-cols-2 gap-4 opacity-50">
                            {[1, 2].map(i => <div key={i} className="h-40 bg-gray-200 dark:bg-gray-800 rounded"></div>)}
                        </div>
                    </div>
                )}

                {section.type === 'contact-hero' && (
                    <div className="py-12 bg-slate-900 text-white text-center rounded relative overflow-hidden">
                        <div className="text-[10px] bg-blue-500/20 px-2 py-1 rounded-full inline-block mb-2 text-blue-300 border border-blue-500/20">{section.content.badge}</div>
                        <h2 className="text-2xl font-black" dangerouslySetInnerHTML={{ __html: section.content.title }}></h2>
                    </div>
                )}

                {section.type === 'contact-content' && (
                    <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-4 rounded">
                        <div className="p-4 bg-white dark:bg-gray-900 rounded border shadow-sm">
                            <div className="font-bold text-sm mb-2">{section.content.formTitle}</div>
                            <div className="space-y-2">
                                <div className="h-8 bg-gray-50 dark:bg-gray-800 rounded border"></div>
                                <div className="h-8 bg-gray-50 dark:bg-gray-800 rounded border"></div>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col justify-end">
                            <div className="font-bold text-sm mb-2">{section.content.infoTitle}</div>
                            <div className="text-[10px] opacity-60 line-clamp-2">{section.content.infoDesc}</div>
                        </div>
                    </div>
                )}

                {section.type === 'hero-modern' && (
                    <div className="text-center py-20 bg-[#0B1120] text-white rounded relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                        <h2 className="text-xs font-bold tracking-[0.2em] text-blue-500 uppercase mb-2">{section.content.smallTitle}</h2>
                        <h1 className="text-5xl font-black leading-none">
                            {section.content.titleLine1}<br />
                            <span className="text-blue-500">{section.content.titleLine2}</span><br />
                            {section.content.titleLine3}
                        </h1>
                    </div>
                )}

                {section.type === 'layered-content' && (
                    <div className={`p-8 rounded flex gap-8 items-center ${section.content.reverse ? 'flex-row-reverse bg-slate-900 text-white' : 'bg-gray-50 dark:bg-slate-800'}`}>
                        <div className="w-1/2 h-40 bg-gray-200 dark:bg-gray-700 rounded bg-cover bg-center" style={{ backgroundImage: `url(${section.content.image})` }}></div>
                        <div className="w-1/2 space-y-2">
                            <h3 className="text-2xl font-bold">{section.content.titlePart1} <span className="text-blue-500">{section.content.titlePart2}</span></h3>
                            <p className="text-xs opacity-70 line-clamp-3">{section.content.description}</p>
                            <div className="flex gap-2">
                                {(section.content.list || []).map((l: string, i: number) => <span key={i} className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2 py-1 rounded">{l}</span>)}
                            </div>
                        </div>
                    </div>
                )}

                {section.type === 'values-grid' && (
                    <div className="py-8 bg-gray-50 dark:bg-gray-900 rounded p-4">
                        <div className="text-center mb-6">
                            <div className="text-xs text-blue-500 font-bold uppercase">{section.content.title}</div>
                            <h2 className="text-2xl font-bold">{section.content.subtitle}</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {(section.content.items as { title: string; desc: string }[] || []).map((item, i) => (
                                <div key={i} className="bg-white dark:bg-black p-4 rounded border dark:border-gray-800">
                                    <div className="font-bold text-sm mb-1">★ {item.title}</div>
                                    <div className="text-xs opacity-60 line-clamp-2">{item.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {section.type === 'timeline' && (
                    <div className="py-8 bg-white dark:bg-gray-900 rounded p-4">
                        <h2 className="text-xl font-bold text-center mb-6">{section.content.subtitle}</h2>
                        <div className="space-y-4">
                            {(section.content.items as { year: string; title: string; desc: string }[] || []).map((item, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <div className="text-2xl font-black text-gray-200 dark:text-gray-800">{item.year}</div>
                                    <div>
                                        <div className="font-bold">{item.title}</div>
                                        <div className="text-xs opacity-60">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {section.type === 'team-grid' && (
                    <div className="py-8 bg-white dark:bg-gray-900 rounded p-4">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <div className="text-xs text-blue-500 font-bold uppercase">{section.content.title}</div>
                                <h2 className="text-xl font-bold">{section.content.subtitle}</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {(section.content.items as { image: string; name: string; role: string }[] || []).map((item, i) => (
                                <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded overflow-hidden">
                                    <div className="h-20 bg-gray-200 dark:bg-gray-700 bg-cover bg-top" style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className="p-2">
                                        <div className="font-bold text-sm">{item.name}</div>
                                        <div className="text-[10px] text-blue-500">{item.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {section.type === 'text' && (
                    <div className="prose dark:prose-invert max-w-none p-4" dangerouslySetInnerHTML={{ __html: section.content.html }} />
                )}

                {/* ... Existing Types ... */}

                {section.type === 'page-header' && (
                    <div className="relative h-32 bg-slate-900 flex items-center justify-center text-white overflow-hidden rounded">
                        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${section.content.image})` }}></div>
                        <div className="relative z-10 text-center">
                            <h1 className="text-2xl font-bold">{section.content.title}</h1>
                            <p className="text-xs opacity-70">{section.content.description}</p>
                        </div>
                    </div>
                )}

                {section.type === 'cta-banner' && (
                    <div className="py-8 bg-blue-600 text-white text-center rounded">
                        <h2 className="text-xl font-bold mb-2">{section.content.title}</h2>
                        <p className="text-sm opacity-80 mb-4">{section.content.text}</p>
                        <button className="bg-white text-blue-600 px-4 py-1 rounded text-sm font-bold">{section.content.buttonText}</button>
                    </div>
                )}

                {section.type === 'stats-section' && (
                    <div className="grid grid-cols-4 gap-2 bg-slate-900 text-white p-4 rounded">
                        {(section.content.items as { value: string; label: string }[] || []).map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="text-lg font-bold text-blue-400">{item.value}</div>
                                <div className="text-[10px] opacity-60">{item.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {section.type === 'trust-logos' && (
                    <div className="py-4 border-b text-center">
                        <div className="text-[10px] uppercase text-gray-400 mb-2">{section.content.title}</div>
                        <div className="flex justify-center gap-4 text-gray-300">
                            {(section.content.items as { icon: string }[] || []).map((item, i) => (
                                <span key={i} className="material-symbols-outlined">{item.icon}</span>
                            ))}
                        </div>
                    </div>
                )}

                {section.type === 'services-grid' && (
                    <div className="py-8 bg-gray-50 dark:bg-gray-800 p-4 rounded">
                        <h2 className="text-xl font-bold mb-4">{section.content.title}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {(section.content.items as { icon: string; title: string; desc: string }[] || []).map((item, i) => (
                                <div key={i} className="bg-white dark:bg-gray-700 p-4 rounded shadow-sm">
                                    <span className="material-symbols-outlined text-blue-500 mb-2">{item.icon}</span>
                                    <div className="font-bold text-sm">{item.title}</div>
                                    <div className="text-[10px] opacity-60 line-clamp-2">{item.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {section.type === 'projects-slider' && (
                    <div className="py-8 bg-slate-900 text-white p-4 rounded">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <div className="text-[10px] text-blue-500 uppercase">{section.content.subtitle}</div>
                                <h2 className="text-lg font-bold">{section.content.title}</h2>
                            </div>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {(section.content.items as { image: string; title: string; location: string }[] || []).map((item, i) => (
                                <div key={i} className="min-w-[200px] h-32 bg-gray-800 rounded relative overflow-hidden flex-shrink-0">
                                    <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className="absolute bottom-0 left-0 p-2">
                                        <div className="font-bold text-sm">{item.title}</div>
                                        <div className="text-[10px] opacity-70">{item.location}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {section.type === 'featured-case' && (
                    <div className="flex gap-4 bg-white dark:bg-gray-800 rounded p-4 items-center">
                        <div className="w-1/3 h-24 bg-gray-200 rounded bg-cover" style={{ backgroundImage: `url(${section.content.image})` }}></div>
                        <div className="flex-1">
                            <div className="text-[10px] text-blue-500 uppercase font-bold">{section.content.category}</div>
                            <div className="font-bold text-sm mb-1">{section.content.title}</div>
                            <div className="text-[10px] opacity-60 line-clamp-2 mb-2">{section.content.text}</div>
                            <span className="text-[10px] font-bold underline">{section.content.buttonText}</span>
                        </div>
                    </div>
                )}

                {section.type === 'contact-block' && (
                    <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-4 rounded">
                        <div className="p-4 border rounded bg-gray-50 dark:bg-gray-900">
                            <div className="font-bold text-sm mb-2">{section.content.formTitle}</div>
                            <div className="space-y-2">
                                <div className="h-6 bg-white border rounded"></div>
                                <div className="h-6 bg-white border rounded"></div>
                                <div className="h-16 bg-white border rounded"></div>
                                <div className="h-6 w-20 bg-blue-600 rounded"></div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="font-bold text-sm mb-2">{section.content.infoTitle}</div>
                            <div className="space-y-2 text-xs opacity-70">
                                <div>📍 {section.content.address}</div>
                                <div>📞 {section.content.phone}</div>
                                <div>📧 {section.content.email}</div>
                            </div>
                        </div>
                    </div>
                )}

                {section.type === 'blog-grid' && (
                    <div className="py-8 text-center bg-gray-50 dark:bg-gray-800 rounded">
                        <h2 className="text-xl font-bold mb-4">{section.content.title}</h2>
                        <div className="grid grid-cols-3 gap-2 px-4 opacity-50">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            ))}
                        </div>
                        <div className="mt-2 text-xs text-blue-500">Otomatik Blog Listesi (Son {section.content.itemsPerPage} Yazı)</div>
                    </div>
                )}

                {section.type === 'features' && (
                    <div className="py-10 bg-gray-50 dark:bg-gray-800 rounded">
                        <h2 className="text-2xl font-bold text-center mb-8">{section.content.title}</h2>
                        <div className="grid grid-cols-3 gap-4 px-4">
                            {(section.content.items as { title: string; description: string }[] || []).map((item, i) => (
                                <div key={i} className="p-4 bg-white dark:bg-gray-700 rounded text-center shadow-sm">
                                    <div className="font-bold">{item.title}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-300">{item.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {section.type === 'faq-accordion' && (
                    <div className="py-10 bg-white dark:bg-gray-900 rounded p-6">
                        <div className="text-center mb-8">
                            <div className="text-xs font-bold text-blue-500 uppercase tracking-wider">{section.content.subtitle}</div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{section.content.title}</h2>
                        </div>
                        <div className="max-w-2xl mx-auto space-y-3">
                            {(section.content.items as { question: string; answer: string }[] || []).map((item, i) => (
                                <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800 font-bold text-sm flex justify-between items-center cursor-pointer">
                                        {item.question}
                                        <span className="text-blue-500 text-lg">+</span>
                                    </div>
                                    <div className="p-4 text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                                        {item.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {section.type === 'comparison-table' && (
                    <div className="py-10 bg-gray-50 dark:bg-gray-900 rounded p-4 overflow-x-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">{section.content.title}</h2>
                            <p className="text-xs opacity-60">{section.content.subtitle}</p>
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                    {(section.content.columns || []).map((col: string, i: number) => (
                                        <th key={i} className={`p-3 font-bold ${i === 0 ? '' : 'text-center'}`}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {(section.content.rows as { feature: string; val1: string; val2: string; val3: string }[] || []).map((row, i) => (
                                    <tr key={i} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                                        <td className="p-3 font-medium">{row.feature}</td>
                                        <td className="p-3 text-center">{row.val1}</td>
                                        <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">{row.val2}</td>
                                        <td className="p-3 text-center">{row.val3}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {section.type === 'modern-stats' && (
                    <div className="py-12 bg-slate-900 text-white rounded p-6">
                        <div className="grid grid-cols-4 gap-8">
                            {(section.content.items as { value: string; suffix: string; label: string; type: string }[] || []).map((item, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    {item.type === 'circle' ? (
                                        <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center text-xl font-bold mb-3 relative">
                                            {item.value}<span className="text-xs">{item.suffix}</span>
                                        </div>
                                    ) : item.type === 'bar' ? (
                                        <div className="w-full text-center">
                                            <div className="text-3xl font-black text-blue-400 mb-1">{item.value}{item.suffix}</div>
                                            <div className="w-full h-2 bg-gray-700 rounded-full mb-3 overflow-hidden">
                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.value}%` }}></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center mb-3">
                                            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                                {item.value}{item.suffix}
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-xs uppercase tracking-widest opacity-70">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {section.type === 'testimonials-slider' && (
                    <div className="py-12 bg-gray-50 dark:bg-gray-800 rounded p-6">
                        <h2 className="text-2xl font-bold text-center mb-10">{section.content.title}</h2>
                        <div className="flex gap-6 overflow-x-auto pb-4 px-4 snap-x">
                            {(section.content.items as { image: string; name: string; role: string; quote: string }[] || []).map((item, i) => (
                                <div key={i} className="min-w-[300px] bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 snap-center">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}></div>
                                        <div>
                                            <div className="font-bold text-sm">{item.name}</div>
                                            <div className="text-[10px] opacity-60">{item.role}</div>
                                        </div>
                                    </div>
                                    <p className="text-xs italic opacity-80 leading-relaxed">&quot;{item.quote}&quot;</p>
                                    <div className="flex gap-1 mt-3">
                                        {[1, 2, 3, 4, 5].map(star => <span key={star} className="text-yellow-400 text-xs">★</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {section.type === 'masonry-gallery' && (
                    <div className="py-10 bg-white dark:bg-black rounded p-4">
                        <div className="mb-6 px-2">
                            <h2 className="text-2xl font-bold mb-1">{section.content.title}</h2>
                            <p className="text-xs opacity-60">{section.content.description}</p>
                        </div>
                        <div className="columns-3 gap-2 space-y-2">
                            {(section.content.images || []).map((img: string, i: number) => (
                                <div key={i} className="break-inside-avoid rounded-lg overflow-hidden group relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img} alt="" className="w-full h-auto object-cover transition-transform group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons (Only visible on hover/select) */}
            <div className={clsx(
                "absolute top-2 right-2 flex gap-1 transition-opacity z-20",
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}>
                <div
                    {...attributes}
                    {...listeners}
                    className="p-1 bg-white dark:bg-gray-800 shadow rounded cursor-grab active:cursor-grabbing hover:text-blue-600"
                    title="Sürükle"
                >
                    ✋
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="p-1 bg-white dark:bg-gray-800 shadow rounded text-red-500 hover:text-red-700 hover:bg-red-50"
                    title="Sil"
                >
                    🗑️
                </button>
            </div>
        </div >
    );
}
