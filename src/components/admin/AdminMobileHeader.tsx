"use client";

import { useState } from "react";
import { AdminSidebarContent } from "./AdminSidebarContent";

export function AdminMobileHeader() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="lg:hidden flex items-center justify-between p-4 bg-admin-sidebar border-b border-admin-sidebar-border text-white sticky top-0 z-40">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/20 p-1.5 rounded-lg">
                        <span className="material-symbols-outlined text-primary text-xl">security</span>
                    </div>
                    <span className="font-bold text-sm">MKY Grup</span>
                </div>

                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>

            {/* Mobile Drawer Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Drawer Content */}
            <div
                className={`
                    fixed inset-y-0 left-0 z-50 w-72 bg-admin-sidebar border-r border-admin-sidebar-border transform transition-transform duration-300 ease-in-out lg:hidden
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex justify-end p-2 absolute top-2 right-2 z-10">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 text-admin-text-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                <AdminSidebarContent
                    className="pt-8"
                    onLinkClick={() => setIsOpen(false)}
                />
            </div>
        </>
    );
}
