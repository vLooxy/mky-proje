"use client";

import { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateBlogPost } from "@/actions/blog-actions";
import { getCategories } from "@/actions/category-actions";
import { BlogPost, BlogCategory } from "@/types/blog";
import { useEffect, useState } from "react";
import TipTapEditor from "./TipTapEditor";

type BlogPostFormProps = {
    post?: BlogPost;
    isAdmin?: boolean;
};

export default function BlogPostForm({ post, isAdmin = false }: BlogPostFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [categories, setCategories] = useState<BlogCategory[]>([]);

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    // Helper to format date for datetime-local input in local timezone
    const formatLocalDatetime = (dateStr?: string | null) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        // Adjust for local timezone offset
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date.toISOString().slice(0, 16);
    };

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm<BlogPost & { publishedAt?: string }>({
        defaultValues: post ? {
            ...post,
            publishedAt: formatLocalDatetime(post.publishedAt),
        } : {
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            image: "",
            author: "",
            tags: [], // Although input will be string, we handle it
            categoryId: "",
            isPublished: false,
            readTime: "",
            publishedAt: "",
        },
    });

    // Real-time watch for image URL to show preview
    // We already have useForm, wait, we need to extract watch
    // I can just destructure watch from useForm hook along with register, handleSubmit, etc.

    const imageUrlPreview = watch("image");

    const onSubmit = (data: BlogPost & { publishedAt?: string }) => {
        startTransition(async () => {
            // Ensure tags are array if coming from string input
            const formattedData = {
                ...data,
                tags: typeof data.tags === 'string' ? (data.tags as string).split(',').map((t: string) => t.trim()) : data.tags,
                publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString() : null,
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
                    <div className="bg-white dark:bg-[#1a2632] rounded-lg">
                        <Controller
                            name="content"
                            control={control}
                            rules={{ required: "İçerik zorunludur" }}
                            render={({ field }) => (
                                <TipTapEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
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
                    {imageUrlPreview && (
                        <div className="mt-2 w-full max-w-sm rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imageUrlPreview as string} alt="Önizleme" className="object-cover w-full h-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} onLoad={(e) => { (e.target as HTMLImageElement).style.display = 'block'; }} />
                        </div>
                    )}
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
                        Okuma Süresi
                    </label>
                    <input
                        {...register("readTime")}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Örn: 5 dk okuma"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Yayın Tarihi (Boş bırakılırsa otomatik o anki tarih atanır)
                    </label>
                    <input
                        type="datetime-local"
                        {...register("publishedAt")}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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

                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register("isPublished")}
                            id="isPublished"
                            disabled={!isAdmin}
                            className={`h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary ${!isAdmin ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        <label htmlFor="isPublished" className={`text-sm font-medium ${!isAdmin ? 'text-slate-500 dark:text-slate-500 cursor-not-allowed' : 'text-slate-700 dark:text-slate-300'}`}>
                            Yayınla
                        </label>
                    </div>
                    {!isAdmin && (
                        <p className="text-xs text-amber-600 dark:text-amber-500">
                            Blog durumunu yönetmek için Yönetici izinleri gereklidir.
                        </p>
                    )}
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
