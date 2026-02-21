// AdminSidebar is a Server Component, wrapping the client component AdminSidebarContent

import { AdminSidebarContent } from "./AdminSidebarContent";
import { User } from "@/types/rbac";

export function AdminSidebar({ user }: { user: User }) {
    return (
        <aside className="hidden lg:flex flex-col w-72 h-full shrink-0">
            <AdminSidebarContent user={user} className="w-full h-full border-r-0" />
        </aside>
    );
}
