import { UserForm } from "@/components/admin/UserForm";
import { getUser } from "@/actions/user-actions";
import { getRoles } from "@/actions/role-actions";
import { notFound } from "next/navigation";

interface EditUserPageProps {
    params: {
        id: string;
    };
}

export default async function EditUserPage({ params }: EditUserPageProps) {
    const { id } = await params;
    const [{ success, user }, rolesRes] = await Promise.all([
        getUser(id),
        getRoles()
    ]);

    if (!success || !user) {
        notFound();
    }

    const roles = rolesRes.success && rolesRes.roles ? rolesRes.roles : [];

    return (
        <div className="p-6 lg:p-10">
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Kullanıcı Düzenle</h1>
                    <p className="text-slate-500 dark:text-admin-text-muted mt-1 text-sm">{user.name} kullanıcısını düzenliyorsunuz.</p>
                </div>

                <div className="bg-admin-card dark:bg-admin-card-dark rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                    <UserForm user={user} roles={roles} />
                </div>
            </div>
        </div>
    );
}
