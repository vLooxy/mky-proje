import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden text-slate-900 dark:text-slate-100 font-display">
            <AdminSidebar />
            <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-light dark:bg-background-dark">
                {/* Mobile Header would go here if we were implementing mobile fully right now, keeping simple for now */}
                <div className="flex-1 overflow-y-auto scroll-smooth">
                    {children}
                </div>
            </main>
        </div>
    );
}
