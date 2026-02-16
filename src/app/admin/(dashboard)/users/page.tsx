import Link from "next/link";
import { getUsers } from "@/actions/user-actions";
import { UserList } from "@/components/admin/UserList";
import { Suspense } from "react";

export default async function AdminUsersPage() {
    const { users } = await getUsers();

    return (
        <div className="p-6 lg:p-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Kullanıcılar</h1>
                        <p className="text-slate-500 dark:text-admin-text-muted mt-1 text-sm">Yönetici ve editör hesaplarını yönetin.</p>
                    </div>
                    <Link
                        href="/admin/users/new"
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px]">person_add</span>
                        <span>Yeni Kullanıcı</span>
                    </Link>
                </div>

                <div className="bg-admin-card dark:bg-admin-card-dark rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                    <Suspense fallback={<div className="p-8 text-center text-slate-500">Yükleniyor...</div>}>
                        <UserList initialUsers={users || []} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
