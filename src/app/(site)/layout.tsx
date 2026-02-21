import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSettings } from "@/actions/settings-actions";

export default async function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getSettings();
    const siteTitle = settings?.site?.title || "MKY";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navItems = settings?.header?.navItems?.map((item: any) => ({
        name: item.label,
        href: item.href,
        hasDropdown: !!item.subItems?.length,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dropdownItems: item.subItems?.map((sub: any) => ({
            name: sub.label,
            href: sub.href
        }))
    })) || [
            { name: "Ana Sayfa", href: "/" },
            { name: "Hizmetlerimiz", href: "/hizmetlerimiz" },
            { name: "İletişim", href: "/iletisim" },
        ];

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Header initialSiteTitle={siteTitle} initialNavItems={navItems} />
            <main className="flex-grow flex flex-col w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
}
