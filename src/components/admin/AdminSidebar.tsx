"use client";

import { AdminSidebarContent } from "./AdminSidebarContent";

export function AdminSidebar() {
    return (
        <aside className="hidden lg:flex flex-col w-72 h-full shrink-0">
            <AdminSidebarContent className="w-full h-full border-r-0" />
        </aside>
    );
}
