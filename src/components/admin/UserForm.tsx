"use client";

import { useTransition, useState } from "react";
import { createUser, updateUser } from "@/actions/user-actions";
import { useRouter } from "next/navigation";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

export function UserForm({ user }: { user?: User }) {
    const isEdit = !!user;
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setError(null);
        startTransition(async () => {
            const res = isEdit
                ? await updateUser(user.id, formData)
                : await createUser(formData);

            if (res.success) {
                router.push("/admin/users");
            } else {
                setError(res.message || "Bir hata oluştu.");
            }
        });
    };

    return (
        <form action={handleSubmit} className="flex flex-col gap-6">
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Ad Soyad
                    </label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={user?.name}
                        required
                        className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Örn: Ahmet Yılmaz"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        E-posta Adresi
                    </label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={user?.email}
                        required
                        className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="orn@sirket.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Parola {isEdit && "(Değiştirmek için doldurun)"}
                    </label>
                    <input
                        type="password"
                        name="password"
                        required={!isEdit}
                        className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="********"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Rol
                    </label>
                    <select
                        name="role"
                        defaultValue={user?.role || "EDITOR"}
                        className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option value="EDITOR">Editör (İçerik Yönetimi)</option>
                        <option value="ADMIN">Yönetici (Tam Yetki)</option>
                    </select>
                </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    İptal
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium shadow-sm transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isPending ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Kaydediliyor...</span>
                        </>
                    ) : (
                        <span>{isEdit ? "Güncelle" : "Kullanıcı Oluştur"}</span>
                    )}
                </button>
            </div>
        </form>
    );
}
