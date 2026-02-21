import { UserForm } from "@/components/admin/UserForm";
import { getRoles } from "@/actions/role-actions";

export default async function NewUserPage() {
    const rolesRes = await getRoles();
    const roles = rolesRes.success && rolesRes.roles ? rolesRes.roles : [];

    return (
        <div className="p-6 lg:p-10">
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Yeni Kullanıcı</h1>
                    <p className="text-slate-500 dark:text-admin-text-muted mt-1 text-sm">Sisteme yeni bir kullanıcı ekleyin.</p>
                </div>

                <div className="bg-admin-card dark:bg-admin-card-dark rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                    <UserForm roles={roles} />
                </div>
            </div>
        </div>
    );
}
