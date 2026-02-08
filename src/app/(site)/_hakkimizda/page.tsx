import { PageHeader } from "@/components/ui/PageHeader";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title={
                    <>
                        Güvenlik & <span className="text-primary">Dürüstlüğe</span> Adanmışlık
                    </>
                }
                description="30 yılı aşkın süredir, MKY Grup iş sağlığı uyumluluğu ve yapısal mühendislik mükemmelliğinde standardı belirlemektedir."
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBFDZyr-QNmb3k0yeL9-kTCDYGJof1QqCXYrDrlQOVE6dKq-EbkCzcmSudJlInLrvVvhpTAJPvdz381JS2P759lk24ODLmrU6q3GvRVAEyO2tqrun4dIsEjJgZt6tMPJMazoC9eQRk6A4R8T02NgjDzCJOFdUgk4WHcjdgxvfmx4M5HvzZohuan5uEVQwTwxZDk1fX83BZoajPIIXbeqzWaEd0a4MuoV2pzLdtq8v_0nFroFNqBv77n4D3GbaETWJYJ8kVZ8gFFjQ0"
                badge={
                    <>
                        <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">
                            1993&apos;ten Beri
                        </span>
                    </>
                }
            />

            {/* Purpose Section */}
            <section className="w-full py-20 bg-white dark:bg-[#15202b]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <FadeIn direction="up">
                            <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">
                                Amacımız
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                                Endüstri Standartlarını İleriye Taşıyoruz
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                Sadece yönetmelikleri takip etmiyoruz; inovasyon ve titiz mühendislik
                                uygulamalarıyla endüstriyel güvenliğin geleceğini şekillendiriyoruz.
                            </p>
                        </FadeIn>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <FadeIn direction="right" delay={200}>
                            <div className="relative bg-background-light dark:bg-background-dark p-10 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow h-full">
                                <div className="absolute top-0 right-0 p-10 opacity-5 text-primary">
                                    <span className="material-symbols-outlined text-9xl">
                                        visibility
                                    </span>
                                </div>
                                <div className="relative z-10">
                                    <div className="size-16 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-6">
                                        <span className="material-symbols-outlined text-3xl">
                                            visibility
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                        Vizyonumuz
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                        Güvenlik ve mühendislik bütünlüğünde küresel referans noktası olmak;
                                        endüstriyel ilerleme ve insan güvenliğinin mükemmel bir uyum içinde olduğu,
                                        kalite veya yaşamdan ödün verilmeyen bir dünya yaratmak.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn direction="left" delay={400}>
                            <div className="relative bg-primary text-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden h-full">
                                <div className="absolute top-0 right-0 p-10 opacity-10 text-white">
                                    <span className="material-symbols-outlined text-9xl">
                                        rocket_launch
                                    </span>
                                </div>
                                <div className="relative z-10">
                                    <div className="size-16 rounded-xl bg-white/20 flex items-center justify-center text-white mb-6">
                                        <span className="material-symbols-outlined text-3xl">
                                            rocket_launch
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">
                                        Misyonumuz
                                    </h3>
                                    <p className="text-blue-100 text-lg leading-relaxed">
                                        Endüstrileri hassas mühendislik çözümleri ve kapsamlı güvenlik
                                        stratejileriyle güçlendirmek; riski en aza indirmek, verimliliği
                                        maksimize etmek ve her çalışanın her gün evine güvenle dönmesini sağlamak.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="w-full py-20 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <FadeIn direction="up">
                            <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">
                                Yolculuğumuz
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                                On Yılların Mükemmelliği
                            </h2>
                        </FadeIn>
                    </div>
                    <div className="relative">
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 transform md:-translate-x-1/2"></div>
                        <div className="space-y-12">
                            {/* Timeline Items */}
                            {[
                                { year: "1993", title: "Kuruluş", desc: "New York'ta endüstriyel güçlendirme konusunda uzmanlaşmış butik bir yapısal mühendislik danışmanlığı olarak kuruldu.", order: "left" },
                                { year: "2001", title: "İSG Bölümü Lansmanı", desc: "Entegre güvenlik ihtiyacını görerek, özel İSG danışmanlık kanadımızı başlattık.", order: "right" },
                                { year: "2015", title: "ISO 9001 Sertifikasyonu", desc: "Tüm küresel ofislerde kalite yönetim sistemleri için uluslararası tanınırlık elde edildi.", order: "left" },
                                { year: "2023", title: "Küresel Genişleme", desc: "Avrupa ve Asya'ya operasyonlar genişletildi, çok uluslu üretim devleri için güvenilir bir ortak haline gelindi.", order: "right" }
                            ].map((item, index) => (
                                <FadeIn key={index} direction={item.order === "left" ? "right" : "left"}>
                                    <div className="relative flex flex-col md:flex-row items-start md:items-center w-full group">
                                        <div className={`w-full md:w-1/2 pl-20 md:pl-0 md:pr-16 md:text-right ${item.order === 'right' ? 'md:order-1' : ''}`}>
                                            {item.order === 'left' ? (
                                                <h3 className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors">{item.year}</h3>
                                            ) : (
                                                <>
                                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                                    <p className="text-slate-600 dark:text-slate-400 mt-2">{item.desc}</p>
                                                </>
                                            )}
                                        </div>
                                        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 size-4 bg-white dark:bg-slate-800 border-4 border-primary rounded-full z-10 shadow-[0_0_0_4px_rgba(37,99,235,0.2)]"></div>
                                        <div className={`w-full md:w-1/2 pl-20 md:pl-16 ${item.order === 'right' ? 'md:order-2' : ''}`}>
                                            {item.order === 'right' ? (
                                                <h3 className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors">{item.year}</h3>
                                            ) : (
                                                <>
                                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                                    <p className="text-slate-600 dark:text-slate-400 mt-2">{item.desc}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="w-full py-20 bg-white dark:bg-[#1a2632]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn direction="up">
                        <div className="mb-12 md:mb-16 flex justify-between items-end">
                            <div>
                                <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">
                                    Liderlik
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                                    Uzmanlarımızla Tanışın
                                </h2>
                            </div>
                            <div className="hidden md:block">
                                <Link
                                    className="text-primary font-bold flex items-center gap-2 hover:underline"
                                    href="/"
                                >
                                    Tüm Ekibi Gör{" "}
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah Jenkins", role: "Genel Müdür (CEO)", desc: "Endüstriyel güvenlik yönetiminde 20 yılı aşkın tecrübesiyle Sarah, daha güvenli bir iş yeri ortamı vizyonumuza liderlik ediyor.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKhiuUr2r4Fpxp9wprCAc2qip_tGU4zcRd3lFERCi6HqkXElkXaC38eadOLUF3czCNORXMY9yJTBTxxL0qPHKk2_xTsbk876xZE15LYpKJLbt5jm_zQRo03YtWpyEJT1My4pC8vLselxEc45rG5cw9hEZ8v8TtLv3s_ZK6cjfKydQ0nt3k73QIdY0nnaKYFRa1ITKzrMrPyijFYlBLLt-PloWHY9sD__M33rYPF6Ot0yyhIMpltauC69HErEiTfnI2VwwTH8ijXDI" },
                            { name: "David Chen, PE", role: "Mühendislik Direktörü", desc: "David, tüm büyük yapısal projeleri denetler, teknik hassasiyet ve uluslararası yapı kodlarına uyumu sağlar.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZqvAb3x2xbgdKegiZwJ55ufUgbsCVqXcTTd_aju5o53E2CHhrP-mKg3vJRiCg0-qJRyatntUOzbyjxO3FjzdRKRNcYToouCjE8ZreT6aSuMKY9eIp3v42kSozOBBMZM4k9lboiVWoLbeCqRUpK_VjzZy_-pwA9Z3fzH1_wz5_utT2oxdbQ2WZ3fd0nTV0IK5qGET_QUOktmuLc9_Nn5_gMWKnU1bSa0UUmWEqoB-SQLBkV8n3iLRO76cZkm3uztDibiVTFLxuTkA" },
                            { name: "Michael Ross", role: "Güvenlik Denetim Başkanı", desc: "Michael, yüksek riskli endüstriyel sektörler için ISO sertifikasyonu ve titiz güvenlik denetimi konularında uzmanlaşmıştır.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3mlpP3bZMgFCjR5tTiK6--mwPwN-QpBXYVk91M4IWfmlaZkN6yjs3AKDL4c6ow9Q6VPrdQGEhkXbdRXdYk10IVp4Xs2Df7Ol8M12s5BbDZ9WIxToVLLbym6SUqt1SO6ON-RzMSTu0u6sIhWaGm5ELu3bPLoNB5NJ7OI5zqeI-fEiSjfH9zBAuW8JxuI5GcDOc_IEnfjZ_LaIzWOTow3rrAVRg3sqmdxuevI_NhuwI3eu5Hcn4N3mxi2Lxh1ULYAg04C0NAoZLZl8" }
                        ].map((member, index) => (
                            <FadeIn key={index} delay={index * 100} direction="up">
                                <div className="group bg-background-light dark:bg-background-dark rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                    <div className="h-80 overflow-hidden relative">
                                        <div
                                            className="w-full h-full bg-cover bg-top group-hover:scale-105 transition-transform duration-500"
                                            style={{ backgroundImage: `url('${member.image}')` }}
                                        ></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                            {member.name}
                                        </h3>
                                        <p className="text-primary font-medium text-sm mb-4">
                                            {member.role}
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                                            {member.desc}
                                        </p>
                                        <div className="flex gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                            <a className="text-slate-900 dark:text-white hover:text-primary transition-colors" href="#">
                                                <span className="material-symbols-outlined">mail</span>
                                            </a>
                                            <a className="text-slate-900 dark:text-white hover:text-primary transition-colors" href="#">
                                                <span className="material-symbols-outlined">work</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
