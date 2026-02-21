import { getPermissions } from "@/actions/role-actions";
import { RoleForm } from "@/components/admin/RoleForm";

import { requirePermission } from "@/lib/auth-checks";

export const dynamic = "force-dynamic";

export default async function NewRolePage() {
    await requirePermission("manage_roles");
    const { permissions } = await getPermissions();

    if (!permissions) {
        return <div>İzinler yüklenemedi.</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Yeni Rol Oluştur</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Sistem için yeni bir kullanıcı rolü tanımlayın.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <RoleForm allPermissions={permissions} />
            </div>
        </div>
    );
}
