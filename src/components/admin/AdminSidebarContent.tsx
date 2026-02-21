"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { logout } from "@/actions/auth-actions";
import { User, Permission } from "@/types/rbac";

interface AdminSidebarContentProps {
    className?: string;
    onLinkClick?: () => void;
    user?: User;
}

export function AdminSidebarContent({ className, onLinkClick, user }: AdminSidebarContentProps) {
    const pathname = usePathname();

    // Permissions check
    const hasPermission = (slug: string) => {
        if (!user || !user.role) return false;
        if (user.role.name === "Yönetici") return true; // Admin has all
        return user.role.permissions?.some((p: Permission) => p.slug === slug) ?? false;
    };

    const menuItems = [
        {
            title: "Panel",
            icon: "dashboard",
            href: "/admin",
            exact: true,
            permission: "view_dashboard",
        },
        {
            title: "Sayfa Yönetimi",
            icon: "web",
            href: "/admin/builder",
            permission: "manage_pages",
        },
        {
            title: "Blog Yazıları",
            icon: "description",
            href: "/admin/blog",
            permission: "manage_blog",
        },
        {
            title: "Medya Kütüphanesi",
            icon: "image",
            href: "/admin/media",
            permission: "manage_media",
        },
        {
            title: "Kullanıcılar",
            icon: "group",
            href: "/admin/users",
            permission: "manage_users",
        },
        {
            title: "Roller",
            icon: "badge",
            href: "/admin/roles",
            permission: "manage_roles",
        },
        {
            title: "Ayarlar",
            icon: "settings",
            href: "/admin/settings",
            permission: "manage_settings",
        },
    ];

    const filteredMenuItems = menuItems.filter(item => !item.permission || hasPermission(item.permission));

    return (
        <div className={cn("flex flex-col h-full bg-admin-sidebar border-r border-admin-sidebar-border transition-all duration-300", className)}>
            {/* Logo & Header */}
            <div className="p-6 flex items-center gap-3 mb-2 shrink-0">
                <div className="bg-primary/20 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">security</span>
                </div>
                <div>
                    <h1 className="text-white text-lg font-bold leading-tight">MKY Grup Yönetim</h1>
                    <p className="text-admin-text-muted text-xs font-normal">Mühendislik & İSG</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 space-y-2 py-4">
                {filteredMenuItems.map((item) => {
                    const isActive = item.exact
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onLinkClick}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all group",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-admin-text-muted hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <span className={cn(
                                "material-symbols-outlined transition-transform group-hover:scale-110",
                                isActive ? "text-white" : "text-admin-text-muted group-hover:text-white"
                            )}>
                                {item.icon}
                            </span>
                            <span className="text-sm font-medium">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Footer */}
            <div className="p-4 border-t border-admin-sidebar-border space-y-3 shrink-0">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold border-2 border-slate-600">
                        {user?.name?.slice(0, 2).toUpperCase() || "YM"}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <p className="text-white text-sm font-medium truncate">{user?.name || "Kullanıcı"}</p>
                        <p className="text-admin-text-muted text-xs truncate">{user?.role?.name || "Rol Yok"}</p>
                    </div>
                </div>

                <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Çıkış Yap
                </button>
            </div>
        </div>
    );
}
