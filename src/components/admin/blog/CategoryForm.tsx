"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { addCategory, updateCategory, deleteCategory } from "@/actions/category-actions";
import { BlogCategory } from "@/types/blog";

type CategoryFormProps = {
    initialCategories: BlogCategory[];
};

export default function CategoryForm({ initialCategories }: CategoryFormProps) {
    const [isPending, startTransition] = useTransition();
    const [editingId, setEditingId] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<BlogCategory>({
        defaultValues: {
            name: "",
            slug: "",
            color: "bg-blue-500",
        },
    });

    const onSubmit = (data: BlogCategory) => {
        startTransition(async () => {
            if (editingId) {
                await updateCategory(editingId, data);
                setEditingId(null);
            } else {
                await addCategory(data);
            }
            reset();
        });
    };

    const handleEdit = (category: BlogCategory) => {
        setEditingId(category.id);
        setValue("name", category.name);
        setValue("slug", category.slug);
        setValue("color", category.color);
    };

    const handleDelete = (id: string) => {
        if (confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) {
            startTransition(async () => {
                await deleteCategory(id);
            });
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        reset();
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section */}
            <div className="lg:col-span-1">
                <div className="bg-admin-card dark:bg-admin-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm sticky top-6">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                        {editingId ? "Kategoriyi Düzenle" : "Yeni Kategori Ekle"}
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Kategori Adı
                            </label>
                            <input
                                {...register("name", { required: "Kategori adı zorunludur" })}
                                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Örn: Teknoloji"
                            />
                            {errors.name && (
                                <p className="text-xs text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Slug
                            </label>
                            <input
                                {...register("slug", { required: "Slug zorunludur" })}
                                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="orn-teknoloji"
                            />
                            {errors.slug && (
                                <p className="text-xs text-red-500">{errors.slug.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Renk (Tailwind Class)
                            </label>
                            <select
                                {...register("color")}
                                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                                <option value="bg-blue-500">Mavi</option>
                                <option value="bg-green-500">Yeşil</option>
                                <option value="bg-red-500">Kırmızı</option>
                                <option value="bg-yellow-500">Sarı</option>
                                <option value="bg-purple-500">Mor</option>
                                <option value="bg-gray-500">Gri</option>
                            </select>
                        </div>

                        <div className="pt-2 flex gap-2">
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    İptal
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex-1 px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
                            >
                                {isPending ? "Kaydediliyor..." : (editingId ? "Güncelle" : "Ekle")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* List Section */}
            <div className="lg:col-span-2">
                <div className="bg-admin-card dark:bg-admin-card-dark rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-500 dark:text-admin-text-muted">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-700 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-4">Kategori Adı</th>
                                    <th className="px-6 py-4">Slug</th>
                                    <th className="px-6 py-4">Yazı Sayısı</th>
                                    <th className="px-6 py-4 text-right">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {initialCategories.length > 0 ? (
                                    initialCategories.map((category) => (
                                        <tr key={category.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
                                                    <span className="font-medium text-slate-900 dark:text-white">{category.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs">{category.slug}</td>
                                            <td className="px-6 py-4">{category.count || 0}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEdit(category)}
                                                        className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors"
                                                        title="Düzenle"
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(category.id)}
                                                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                                                        title="Sil"
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                            Henüz hiç kategori bulunmuyor.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
