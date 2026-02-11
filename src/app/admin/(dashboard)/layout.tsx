import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileHeader } from "@/components/admin/AdminMobileHeader";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden text-slate-900 dark:text-slate-100 font-display">
            <AdminSidebar />
            <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-light dark:bg-background-dark">
                <AdminMobileHeader />
                <div className="flex-1 overflow-y-auto scroll-smooth">
                    {children}
                </div>
            </main>
        </div>
    );
}
