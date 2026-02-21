"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface NavItem {
    name: string;
    href: string;
    hasDropdown?: boolean;
    dropdownItems?: { name: string; href: string }[];
}

interface HeaderProps {
    initialSiteTitle?: string;
    initialNavItems?: NavItem[];
}

export function Header({ initialSiteTitle = "MKY", initialNavItems = [] }: HeaderProps) {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Use props directly instead of client-state to prevent layout shift
    const siteTitle = initialSiteTitle;
    const navItems = initialNavItems.length > 0 ? initialNavItems : [
        { name: "Ana Sayfa", href: "/" },
        { name: "Hizmetlerimiz", href: "/hizmetlerimiz" },
        { name: "İletişim", href: "/iletisim" },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <header className="relative w-full max-w-5xl rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-xl px-6 py-2 flex items-center justify-between transition-all duration-300">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-black tracking-tighter text-gray-800 dark:text-white">
                            {siteTitle}<span className="text-primary">.</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex justify-center items-center flex-1 px-4 pl-20">
                    <nav className="flex items-center gap-8">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative group">
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${(pathname === item.href && !item.hasDropdown) ||
                                        (item.hasDropdown && item.dropdownItems?.some(sub => sub.href === pathname))
                                        ? "text-[#4dabf7]"
                                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                    {item.hasDropdown && (
                                        <span className="material-symbols-outlined text-[1.2rem] opacity-70 group-hover:rotate-180 transition-transform duration-200">
                                            expand_more
                                        </span>
                                    )}
                                </Link>

                                {/* Dropdown Menu */}
                                {item.hasDropdown && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 min-w-[180px] overflow-hidden">
                                            {item.dropdownItems?.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className={`block px-4 py-2.5 text-sm rounded-lg transition-colors whitespace-nowrap ${pathname === subItem.href
                                                        ? "text-primary font-bold bg-blue-50 dark:bg-blue-900/10"
                                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                                                        }`}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Right Section: CTA & Mobile Toggle */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                        className="flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white"
                        aria-label="Temayı değiştir"
                    >
                        {mounted && resolvedTheme === "dark" ? (
                            <span className="material-symbols-outlined text-xl">light_mode</span>
                        ) : (
                            <span className="material-symbols-outlined text-xl">dark_mode</span>
                        )}
                    </button>

                    <Link
                        href="/iletisim"
                        className="hidden sm:flex items-center justify-center rounded-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-6 py-2.5 text-sm font-bold transition-all shadow-lg hover:shadow-blue-900/20"
                    >
                        Hemen Teklif Al
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 flex items-center justify-center text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay - Full Screen Slide-in */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar Drawer */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-full max-w-[300px] bg-surface-light dark:bg-[#0f172a] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-xl font-black tracking-tighter text-gray-800 dark:text-white">
                        MKY<span className="text-primary">.</span>
                    </span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-2">
                    {navItems.map((item) => (
                        <div key={item.name} className="flex flex-col">
                            <Link
                                href={item.href}
                                onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${(pathname === item.href && !item.hasDropdown)
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-text-main dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
                                    }`}
                            >
                                <span className="text-base font-medium">{item.name}</span>
                                {item.hasDropdown && (
                                    <span className="material-symbols-outlined text-xl opacity-50">chevron_right</span>
                                )}
                            </Link>

                            {/* Flattened sub-items */}
                            {item.hasDropdown && (
                                <div className="pl-4 flex flex-col gap-1 mt-1 ml-2 border-l border-gray-200 dark:border-gray-800">
                                    {item.dropdownItems?.map((subItem) => (
                                        <Link
                                            key={subItem.name}
                                            href={subItem.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors block rounded-lg hover:bg-gray-50 dark:hover:bg-white/5"
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Drawer Footer */}
                <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
                    <Link
                        href="/iletisim"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex w-full items-center justify-center rounded-xl h-12 bg-primary hover:bg-blue-600 text-white text-base font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all mb-4"
                    >
                        Hemen Teklif Al
                    </Link>
                    <p className="text-center text-xs text-gray-400 dark:text-gray-600">
                        © 2026 MKY Grup Mühendislik
                    </p>
                </div>
            </div>
        </div>
    );
}
