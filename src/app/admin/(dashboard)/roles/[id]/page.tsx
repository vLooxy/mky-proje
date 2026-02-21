import { getPermissions, getRole } from "@/actions/role-actions";
import { RoleForm } from "@/components/admin/RoleForm";

import { requirePermission } from "@/lib/auth-checks";

export const dynamic = "force-dynamic";

export default async function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
    await requirePermission("manage_roles");
    const { id } = await params;

    // Parallel data fetching
    const [permissionsData, roleData] = await Promise.all([
        getPermissions(),
        getRole(id)
    ]);

    if (!permissionsData.permissions || !roleData.role) {
        return <div className="p-8 text-center">Veri yüklenemedi.</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Rol Düzenle</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">{roleData.role.name} rolünü düzenliyorsunuz.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <RoleForm role={roleData.role} allPermissions={permissionsData.permissions} />
            </div>
        </div>
    );
}
