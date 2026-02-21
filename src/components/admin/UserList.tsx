"use client";

import { useTransition } from "react";
import Link from "next/link";
import { deleteUser } from "@/actions/user-actions";

import { User } from "@/types/rbac";

// type User = { ... } // Removed local definition in favor of import

export function UserList({ initialUsers, canDelete }: { initialUsers: User[], canDelete: boolean }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async (id: string) => {
        if (confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
            startTransition(async () => {
                const res = await deleteUser(id);
                if (!res.success) {
                    alert(res.message);
                }
            });
        }
    };

    if (initialUsers.length === 0) {
        return (
            <div className="p-8 text-center text-slate-500">
                Henüz hiç kullanıcı bulunmamaktadır.
            </div>
        );
    }

    return (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-16">AVATAR</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">AD SOYAD</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">E-POSTA</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">ROL</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">TARİH</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">İŞLEMLER</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {initialUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-4">
                            <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm">
                                {user.name.slice(0, 2).toUpperCase()}
                            </div>
                        </td>
                        <td className="p-4 font-medium text-slate-900 dark:text-white uppercase">
                            {user.name}
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-400">
                            {user.email}
                        </td>
                        <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                ${user.role?.name === 'Yönetici'
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                }`}>
                                {user.role?.name || 'Rol Yok'}
                            </span>
                        </td>
                        <td className="p-4 text-slate-500 text-sm">
                            {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                                <Link
                                    href={`/admin/users/${user.id}`}
                                    className="text-slate-400 hover:text-primary transition-colors p-1"
                                >
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </Link>
                                {user.email !== "admin@mkygrup.com" && canDelete && (
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        disabled={isPending}
                                        className="text-slate-400 hover:text-red-500 transition-colors p-1 disabled:opacity-50"
                                        title="Kullanıcıyı Sil"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
