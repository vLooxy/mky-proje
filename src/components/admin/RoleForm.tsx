"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { createRole, updateRole } from "@/actions/role-actions";

type Role = {
    id: string;
    name: string;
    description: string | null;
    permissions: { id: string, slug: string }[];
};

type Permission = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
};

export function RoleForm({
    role,
    allPermissions
}: {
    role?: Role,
    allPermissions: Permission[]
}) {
    const isEdit = !!role;
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const rolePermissions = new Set(role?.permissions.map(p => p.id) || []);

    const handleSubmit = async (formData: FormData) => {
        setError(null);
        startTransition(async () => {
            const res = isEdit
                ? await updateRole(role.id, formData)
                : await createRole(formData);

            if (res.success) {
                router.push("/admin/roles");
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
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Rol Adı
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={role?.name}
                            required
                            readOnly={role?.name === "Yönetici"} // Protect Admin name
                            className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 read-only:opacity-60 read-only:bg-slate-100 dark:read-only:bg-slate-900"
                            placeholder="Örn: İçerik Editörü"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Açıklama
                        </label>
                        <textarea
                            name="description"
                            defaultValue={role?.description || ""}
                            className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 h-32"
                            placeholder="Rolün yetkilerini açıklayan kısa bir metin..."
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        İzinler
                    </label>
                    <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-4 max-h-[400px] overflow-y-auto space-y-3">
                        {allPermissions.map((perm) => (
                            <label key={perm.id} className="flex items-start gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    name="permissions"
                                    value={perm.id}
                                    defaultChecked={rolePermissions.has(perm.id)}
                                    className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                />
                                <div>
                                    <div className="text-sm font-medium text-slate-900 dark:text-white">{perm.name}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{perm.description}</div>
                                </div>
                            </label>
                        ))}
                    </div>
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
                        <span>{isEdit ? "Güncelle" : "Rol Oluştur"}</span>
                    )}
                </button>
            </div>
        </form>
    );
}
