import Link from "next/link";
import { getRoles } from "@/actions/role-actions";
import { DeleteRoleButton } from "@/components/admin/DeleteRoleButton";

import { requirePermission, hasPermission } from "@/lib/auth-checks";
import { Role } from "@/types/rbac";

export const dynamic = "force-dynamic";

export default async function RolesPage() {
    await requirePermission("manage_roles");
    const { roles } = await getRoles();
    const canDelete = await hasPermission("delete_records");

    if (!roles) {
        return <div className="p-8 text-center">Roller yüklenirken bir hata oluştu.</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Rol Yönetimi</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Kullanıcı rollerini ve yetkilerini yönetin.</p>
                </div>
                <Link
                    href="/admin/roles/new"
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Yeni Rol Ekle
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">ROL ADI</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">AÇIKLAMA</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">KULLANICI SAYISI</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">İZİN SAYISI</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">İŞLEMLER</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">


                        {roles.map((role: Role) => (
                            <tr key={role.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="p-4 font-medium text-slate-900 dark:text-white">
                                    {role.name}
                                    {(role.name === "Yönetici" || role.name === "Editör") && (
                                        <span className="ml-2 text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500">Sistem</span>
                                    )}
                                </td>
                                <td className="p-4 text-slate-600 dark:text-slate-400 text-sm">
                                    {role.description || "-"}
                                </td>
                                <td className="p-4 text-slate-600 dark:text-slate-400 text-sm">
                                    {role._count?.users || 0}
                                </td>
                                <td className="p-4 text-slate-600 dark:text-slate-400 text-sm">
                                    {role.permissions.length}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            href={`/admin/roles/${role.id}`}
                                            className="text-slate-400 hover:text-primary transition-colors p-1"
                                            title="Düzenle"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </Link>
                                        {canDelete && (
                                            <DeleteRoleButton
                                                id={role.id}
                                                isSystem={role.name === "Yönetici" || role.name === "Editör"}
                                                userCount={role._count?.users || 0}
                                            />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
