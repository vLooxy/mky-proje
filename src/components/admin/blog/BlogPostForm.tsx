"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateBlogPost } from "@/actions/blog-actions";
import { getCategories } from "@/actions/category-actions";
import { BlogPost, BlogCategory } from "@/types/blog";
import { useEffect, useState } from "react";

type BlogPostFormProps = {
    post?: BlogPost;
};

export default function BlogPostForm({ post }: BlogPostFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [categories, setCategories] = useState<BlogCategory[]>([]);

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BlogPost>({
        defaultValues: post || {
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            image: "",
            author: "",
            tags: [], // Although input will be string, we handle it
            categoryId: "",
            isPublished: false,
        },
    });

    const onSubmit = (data: BlogPost) => {
        startTransition(async () => {
            // Ensure tags are array if coming from string input
            const formattedData = {
                ...data,
                tags: typeof data.tags === 'string' ? (data.tags as string).split(',').map((t: string) => t.trim()) : data.tags
            };

            const result = await updateBlogPost(post?.id || "", formattedData);

            if (result.success) {
                router.push("/admin/blog");
                router.refresh();
            } else {
                alert("Bir hata oluştu.");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Başlık
                    </label>
                    <input
                        {...register("title", { required: "Başlık zorunludur" })}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Yazı başlığı"
                    />
                    {errors.title && (
                        <p className="text-xs text-red-500">{errors.title.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Slug (URL)
                    </label>
                    <input
                        {...register("slug", { required: "Slug zorunludur" })}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="yazi-basligi"
                    />
                    {errors.slug && (
                        <p className="text-xs text-red-500">{errors.slug.message}</p>
                    )}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Özet
                    </label>
                    <textarea
                        {...register("excerpt", { required: "Özet zorunludur" })}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Yazı özeti"
                    />
                    {errors.excerpt && (
                        <p className="text-xs text-red-500">{errors.excerpt.message}</p>
                    )}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        İçerik
                    </label>
                    <textarea
                        {...register("content", { required: "İçerik zorunludur" })}
                        rows={10}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                        placeholder="# Markdown içeriği buraya..."
                    />
                    {errors.content && (
                        <p className="text-xs text-red-500">{errors.content.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Görsel URL
                    </label>
                    <input
                        {...register("image")}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Yazar
                    </label>
                    <input
                        {...register("author")}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Yazar adı"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Kategori
                    </label>
                    <select
                        {...register("categoryId")}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option value="">Kategori Seçin</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Etiketler (Virgülle ayırın)
                    </label>
                    <input
                        {...register("tags")}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="teknoloji, güvenlik, yazılım"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("isPublished")}
                        id="isPublished"
                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="isPublished" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Yayınla
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    İptal
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "Kaydediliyor..." : (post ? "Güncelle" : "Oluştur")}
                </button>
            </div>
        </form>
    );
}
