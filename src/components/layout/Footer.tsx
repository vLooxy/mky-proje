import Link from "next/link";
import { getSettings } from "@/actions/settings-actions";
import { Settings } from "@/types/settings";

export async function Footer() {
    const settings = await getSettings() as Settings;

    return (
        <footer className="bg-surface-light dark:bg-surface-dark border-t border-[#f0f2f4] dark:border-gray-800 pt-12 md:pt-16 pb-8 px-6 lg:px-40 transition-colors duration-200">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-text-main dark:text-white">
                            <span className="material-symbols-outlined text-primary text-3xl">
                                engineering
                            </span>
                            <span className="text-xl font-bold">{settings?.site?.title || "MKY Grup"}</span>
                        </div>
                        <p className="text-text-light dark:text-gray-400 text-sm leading-relaxed">
                            {settings?.site?.description || "Hassas mühendislik ve iş sağlığı & güvenliği uyumluluğu konusunda güvenilir çözüm ortağınız."}
                        </p>
                        {/* Social Links from Settings */}
                        <div className="flex gap-4 mt-2">
                            {settings?.social && Object.entries(settings.social).map(([key, url]) => (
                                (url as string).length > 2 && (
                                    <a key={key} href={url as string} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                                        {/* Simple mapping for known icons, fallback to link icon */}
                                        <i className={`fab fa-${key} text-lg`}></i>
                                        {/* Note: If font-awesome is not available, use material symbols or text */}
                                        <span className="sr-only capitalize">{key}</span>
                                    </a>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Footer Columns */}
                    {(settings?.footer?.columns || []).map((col, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                            <h4 className="text-text-main dark:text-white font-bold">{col.title}</h4>
                            <div className="flex flex-col gap-2">
                                {(col.links || []).map((link) => (
                                    <Link
                                        key={link.label}
                                        className="text-text-light dark:text-gray-400 text-sm hover:text-primary transition-colors"
                                        href={link.href}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Fallback if no columns defined (Optional/Temporary) - Removed for clean switch */}

                    {/* Contact/Newsletter */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-text-main dark:text-white font-bold">İletişim</h4>
                        <div className="flex flex-col gap-3 text-sm text-text-light dark:text-gray-400">
                            <p className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">
                                    location_on
                                </span>{" "}
                                {settings?.contact?.address || "123 İnovasyon Cad, Teknoloji Kenti"}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">call</span>{" "}
                                {settings?.contact?.phone || "+90 (555) 123-4567"}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">mail</span>{" "}
                                {settings?.contact?.email || "info@mkygrup.com"}
                            </p>
                        </div>
                    </div>
                </div>
                {/* Bottom Bar */}
                <div className="border-t border-[#f0f2f4] dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-text-light dark:text-gray-500 text-sm">
                        {settings?.site?.copyright || "© 2026 MKY Grup. Tüm hakları saklıdır."}
                    </p>
                    <div className="flex gap-6">
                        <Link
                            className="text-text-light dark:text-gray-500 hover:text-text-main dark:hover:text-white text-sm"
                            href="/"
                        >
                            Gizlilik Politikası
                        </Link>
                        <Link
                            className="text-text-light dark:text-gray-500 hover:text-text-main dark:hover:text-white text-sm"
                            href="/"
                        >
                            Hizmet Şartları
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
