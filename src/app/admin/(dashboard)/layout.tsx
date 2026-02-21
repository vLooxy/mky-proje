import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileHeader } from "@/components/admin/AdminMobileHeader";
import { getCurrentUser } from "@/actions/auth-actions";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser();

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden text-slate-900 dark:text-slate-100 font-display">
            <AdminSidebar user={user} />
            <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-light dark:bg-background-dark">
                <AdminMobileHeader />
                <div className="flex-1 overflow-y-auto scroll-smooth">
                    {children}
                </div>
            </main>
        </div>
    );
}
