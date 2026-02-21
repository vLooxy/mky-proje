"use client";

import { useState, useMemo } from "react";
import { BlogCard } from "@/components/cards/BlogCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { BlogPost, BlogCategory } from "@/types/blog";

interface BlogListProps {
    initialPosts: BlogPost[];
    categories: BlogCategory[];
    title?: string;
    itemsPerPage?: number;
    showSearch?: boolean;
}

export function BlogList({ initialPosts, categories, title, itemsPerPage = 6, showSearch = true }: BlogListProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter categories to only those that have posts
    const activeCategories = useMemo(() => {
        const categoryIdsWithPosts = new Set(initialPosts.map(post => post.categoryId).filter(Boolean));
        return categories.filter(category => categoryIdsWithPosts.has(category.id));
    }, [initialPosts, categories]);

    const filteredPosts = useMemo(() => {
        return initialPosts.filter(post => {
            const matchesCategory = selectedCategory ? post.categoryId === selectedCategory : true;
            const matchesSearch = searchQuery
                ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            return matchesCategory && matchesSearch;
        }).slice(0, itemsPerPage);
    }, [initialPosts, selectedCategory, searchQuery, itemsPerPage]);

    // Simple client-side pagination could be added here, but for now just limiting
    // If real pagination is needed, we'd need more state. 
    // For this task, we'll show all filtered posts or implement "Load More".
    // Let's stick to showing filtered results.

    return (
        <section className="py-20 px-4 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {title && (
                    <FadeIn direction="up">
                        <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">{title}</h2>
                    </FadeIn>
                )}

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    {/* Categories */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === null
                                ? "bg-primary text-white shadow-lg shadow-primary/25"
                                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                                }`}
                        >
                            Tümü
                        </button>
                        {activeCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${selectedCategory === category.id
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                                    }`}
                            >
                                {selectedCategory !== category.id && (
                                    <span className={`w-2 h-2 rounded-full ${category.color.replace('bg-', 'bg-')}`}></span>
                                )}
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    {showSearch && (
                        <div className="w-full md:w-auto relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">search</span>
                            <input
                                type="text"
                                placeholder="Yazılarda ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>
                    )}
                </div>

                {/* Posts Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, i) => {
                            // Find category for badge
                            const category = categories.find(c => c.id === post.categoryId);

                            // Map BlogPost to BlogCard props
                            // Assuming BlogCard expects specific props, adapting here
                            // Note: BlogCard uses 'badge' and 'badgeColor', we'll map category

                            const cardProps = {
                                badge: category?.name || "Genel",
                                badgeColor: category?.color || "bg-slate-500",
                                image: post.image || "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=800",
                                date: post.date ? new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : "",
                                readTime: post.readTime || "5 dk okuma",
                                title: post.title,
                                snippet: post.excerpt,
                                author: post.author || "Admin",
                                slug: post.slug,
                            };

                            return (
                                <FadeIn key={post.id} delay={i * 50} direction="up" className="h-full">
                                    <div className="h-full">
                                        <BlogCard {...cardProps} />
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                            <span className="material-symbols-outlined text-3xl text-slate-400">search_off</span>
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Sonuç bulunamadı</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            Arama kriterlerinize uygun yazı bulunmamaktadır.
                        </p>
                        <button
                            onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                            className="mt-4 text-primary hover:underline font-medium text-sm"
                        >
                            Filtreleri Temizle
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
