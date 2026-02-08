
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import fs from 'fs';
import path from 'path';

async function main() {
    console.log('Seeding database with Full Site Components...');

    // Seed Settings
    const SETTINGS_KEY = "global_settings";
    try {
        const settingsPath = path.join(process.cwd(), 'src/data/settings.json');
        if (fs.existsSync(settingsPath)) {
            const settingsContent = fs.readFileSync(settingsPath, 'utf-8');
            await prisma.settings.upsert({
                where: { key: SETTINGS_KEY },
                update: { value: settingsContent },
                create: { key: SETTINGS_KEY, value: settingsContent }
            });
            console.log('Settings seeded.');
        } else {
            console.warn('Settings file not found at:', settingsPath);
        }
    } catch (e) {
        console.error('Error seeding settings:', e);
    }

    // Clear existing special pages to ensure fresh seed
    await prisma.page.deleteMany({
        where: {
            slug: { in: ['misyon-vizyon', 'hakkimizda', 'hizmetlerimiz', 'blog', 'iletisim'] }
        }
    });

    // 1. Misyon & Vizyon
    await prisma.page.create({
        data: {
            title: 'Misyon & Vizyon',
            slug: 'misyon-vizyon',
            description: 'MKY Grup Misyon ve Vizyon Sayfası',
            isPublished: true,
            sections: {
                create: [
                    {
                        type: 'mission-hero',
                        order: 0,
                        content: JSON.stringify({
                            smallTitle: "MKY GRUP",
                            titleLine1: "GELECEK",
                            titleLine2: "İÇİN",
                            titleLine3: "GÜVENLİK",
                            description: "Sadece yapıları sağlamlaştırmıyoruz; yarının endüstriyel standartlarını ve çalışma kültürünü inşa ediyoruz."
                        })
                    },
                    {
                        type: 'layered-content',
                        order: 1,
                        content: JSON.stringify({
                            bgText: "MİSYON",
                            image: "https://images.unsplash.com/photo-1581094794329-cd119277f82e",
                            number: "01",
                            category: "Misyonumuz",
                            titlePart1: "Endüstriyi",
                            titlePart2: "Dönüştürmek",
                            description: "Misyonumuz, mühendislik mükemmelliği ile iş güvenliği kültürünü birleştirerek, riskleri minimize eden ve verimliliği maksimize eden sürdürülebilir çözümler sunmaktır.",
                            list: [
                                "Sıfır kaza hedefiyle çalışma",
                                "Yenilikçi mühendislik çözümleri",
                                "Sürdürülebilir büyüme odaklı yaklaşım"
                            ],
                            reverse: false
                        })
                    },
                    {
                        type: 'layered-content',
                        order: 2,
                        content: JSON.stringify({
                            bgText: "VİZYON",
                            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
                            number: "02",
                            category: "Vizyonumuz",
                            titlePart1: "Küresel",
                            titlePart2: "Referans",
                            description: "Vizyonumuz, iş sağlığı ve güvenliği ile yapısal mühendislik alanında dünya çapında tanınan, güvenilen ve örnek alınan lider kuruluş olmaktır.",
                            list: [
                                "Küresel geçerlilikte standartlar",
                                "Teknoloji entegrasyonu",
                                "İnsan odaklı gelecek tasarımı"
                            ],
                            stats: [
                                { value: "20+", label: "Ülke" },
                                { value: "500+", label: "Proje" }
                            ],
                            reverse: true
                        })
                    },
                    {
                        type: 'values-grid',
                        order: 3,
                        content: JSON.stringify({
                            title: "DEĞERLER",
                            subtitle: "Bizi Biz Yapan Değerler",
                            items: [
                                { title: "Dürüstlük", desc: "Şeffaflık ve etik değerler temelimizdir.", icon: "verified" },
                                { title: "İnovasyon", desc: "Sürekli gelişim ve teknoloji.", icon: "lightbulb" },
                                { title: "İnsan Odaklılık", desc: "Çalışan güvenliği önceliğimizdir.", icon: "diversity_1" },
                                { title: "Mükemmellik", desc: "Kalite standartlarını belirleriz.", icon: "workspace_premium" },
                                { title: "Sürdürülebilirlik", desc: "Gelecek nesiller için çalışırız.", icon: "eco" },
                                { title: "Çözüm Ortaklığı", desc: "Uzun vadeli güven ilişkisi.", icon: "handshake" }
                            ]
                        })
                    }
                ]
            }
        }
    });

    // 2. Hakkımızda
    await prisma.page.create({
        data: {
            title: 'Hakkımızda',
            slug: 'hakkimizda',
            description: 'MKY Grup Hakkımızda Sayfası',
            isPublished: true,
            sections: {
                create: [
                    {
                        type: 'page-header',
                        order: 0,
                        content: JSON.stringify({
                            title: "Güvenlik & <span class='text-primary'>Dürüstlüğe</span> Adanmışlık",
                            description: "30 yılı aşkın süredir, MKY Grup iş sağlığı uyumluluğu ve yapısal mühendislik mükemmelliğinde standardı belirlemektedir.",
                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFDZyr-QNmb3k0yeL9-kTCDYGJof1QqCXYrDrlQOVE6dKq-EbkCzcmSudJlInLrvVvhpTAJPvdz381JS2P759lk24ODLmrU6q3GvRVAEyO2tqrun4dIsEjJgZt6tMPJMazoC9eQRk6A4R8T02NgjDzCJOFdUgk4WHcjdgxvfmx4M5HvzZohuan5uEVQwTwxZDk1fX83BZoajPIIXbeqzWaEd0a4MuoV2pzLdtq8v_0nFroFNqBv77n4D3GbaETWJYJ8kVZ8gFFjQ0",
                            badge: "1993'ten Beri"
                        })
                    },
                    {
                        type: 'about-purpose',
                        order: 1,
                        content: JSON.stringify({
                            subtitle: "Amacımız",
                            title: "Endüstri Standartlarını İleriye Taşıyoruz",
                            description: "Sadece yönetmelikleri takip etmiyoruz; inovasyon ve titiz mühendislik uygulamalarıyla endüstriyel güvenliğin geleceğini şekillendiriyoruz.",
                            visionTitle: "Vizyonumuz",
                            visionDesc: "Güvenlik ve mühendislik bütünlüğünde küresel referans noktası olmak; endüstriyel ilerleme ve insan güvenliğinin mükemmel bir uyum içinde olduğu, kalite veya yaşamdan ödün verilmeyen bir dünya yaratmak.",
                            missionTitle: "Misyonumuz",
                            missionDesc: "Endüstrileri hassas mühendislik çözümleri ve kapsamlı güvenlik stratejileriyle güçlendirmek; riski en aza indirmek, verimliliği maksimize etmek ve her çalışanın her gün evine güvenle dönmesini sağlamak."
                        })
                    },
                    {
                        type: 'timeline',
                        order: 2,
                        content: JSON.stringify({
                            title: "YOLCULUĞUMUZ",
                            subtitle: "On Yılların Mükemmelliği",
                            items: [
                                { year: "1993", title: "Kuruluş", desc: "New York'ta endüstriyel güçlendirme konusunda uzmanlaşmış butik bir yapısal mühendislik danışmanlığı olarak kuruldu." },
                                { year: "2001", title: "İSG Bölümü Lansmanı", desc: "Entegre güvenlik ihtiyacını görerek, özel İSG danışmanlık kanadımızı başlattık." },
                                { year: "2015", title: "ISO 9001 Sertifikasyonu", desc: "Tüm küresel ofislerde kalite yönetim sistemleri için uluslararası tanınırlık elde edildi." },
                                { year: "2023", title: "Küresel Genişleme", desc: "Avrupa ve Asya'ya operasyonlar genişletildi, çok uluslu üretim devleri için güvenilir bir ortak haline gelindi." }
                            ]
                        })
                    },
                    {
                        type: 'team-grid',
                        order: 3,
                        content: JSON.stringify({
                            title: "LİDERLİK",
                            subtitle: "Uzmanlarımızla Tanışın",
                            items: [
                                { name: "Sarah Jenkins", role: "Genel Müdür (CEO)", desc: "Endüstriyel güvenlik yönetiminde 20 yılı aşkın tecrübesiyle Sarah, daha güvenli bir iş yeri ortamı vizyonumuza liderlik ediyor.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKhiuUr2r4Fpxp9wprCAc2qip_tGU4zcRd3lFERCi6HqkXElkXaC38eadOLUF3czCNORXMY9yJTBTxxL0qPHKk2_xTsbk876xZE15LYpKJLbt5jm_zQRo03YtWpyEJT1My4pC8vLselxEc45rG5cw9hEZ8v8TtLv3s_ZK6cjfKydQ0nt3k73QIdY0nnaKYFRa1ITKzrMrPyijFYlBLLt-PloWHY9sD__M33rYPF6Ot0yyhIMpltauC69HErEiTfnI2VwwTH8ijXDI" },
                                { name: "David Chen, PE", role: "Mühendislik Direktörü", desc: "David, tüm büyük yapısal projeleri denetler, teknik hassasiyet ve uluslararası yapı kodlarına uyumu sağlar.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZqvAb3x2xbgdKegiZwJ55ufUgbsCVqXcTTd_aju5o53E2CHhrP-mKg3vJRiCg0-qJRyatntUOzbyjxO3FjzdRKRNcYToouCjE8ZreT6aSuMKY9eIp3v42kSozOBBMZM4k9lboiVWoLbeCqRUpK_VjzZy_-pwA9Z3fzH1_wz5_utT2oxdbQ2WZ3fd0nTV0IK5qGET_QUOktmuLc9_Nn5_gMWKnU1bSa0UUmWEqoB-SQLBkV8n3iLRO76cZkm3uztDibiVTFLxuTkA" },
                                { name: "Michael Ross", role: "Güvenlik Denetim Başkanı", desc: "Michael, yüksek riskli endüstriyel sektörler için ISO sertifikasyonu ve titiz güvenlik denetimi konularında uzmanlaşmıştır.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3mlpP3bZMgFCjR5tTiK6--mwPwN-QpBXYVk91M4IWfmlaZkN6yjs3AKDL4c6ow9Q6VPrdQGEhkXbdRXdYk10IVp4Xs2Df7Ol8M12s5BbDZ9WIxToVLLbym6SUqt1SO6ON-RzMSTu0u6sIhWaGm5ELu3bPLoNB5NJ7OI5zqeI-fEiSjfH9zBAuW8JxuI5GcDOc_IEnfjZ_LaIzWOTow3rrAVRg3sqmdxuevI_NhuwI3eu5Hcn4N3mxi2Lxh1ULYAg04C0NAoZLZl8" }
                            ]
                        })
                    }
                ]
            }
        }
    });

    // 3. Hizmetlerimiz (High Fidelity)
    await prisma.page.create({
        data: {
            title: 'Hizmetlerimiz',
            slug: 'hizmetlerimiz',
            description: 'MKY Grup Hizmetlerimiz',
            isPublished: true,
            sections: {
                create: [
                    {
                        type: 'page-header',
                        order: 0,
                        content: JSON.stringify({
                            title: "Kapsamlı Mühendislik ve<br /> Güvenlik Çözümleri",
                            description: "Uzman danışmanlık ve yönetim hizmetlerimizle iş gücünüz için uyumluluk ve operasyonel mükemmelliği sağlıyoruz.",
                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWFffgFKdMSVfadfLO-wz6xPxo8RGuXYcTOJV-1WCOPAIpEeki_yiXycGYTUrKgMUOG1eUdfMnOTM_29bhhzeyyVOIxvVT04gIDV978njbvgudQVHuxfejqFBsNh46K7DeUW08AZZUYbQOFrG03GmpFZ0QOC7Qr38SuccACifqDWD2gqLrZpDjpz-QCL1Fye8orJtxE48xedbl62xm24A2Kfv-4TZ1vojfaatPOeNjiE2W2hS5WYeOAjwyvryg09eGwY3vrHNQvjQ",
                            height: "h-[50vh]"
                        })
                    },
                    {
                        type: 'trust-indicators',
                        order: 1,
                        content: JSON.stringify({
                            title: "Dünya çapında endüstri liderleri tarafından güvenilmektedir",
                            items: [
                                { name: "ISO 9001", icon: "verified_user" },
                                { name: "OSHA Compliant", icon: "shield" },
                                { name: "LEED Certified", icon: "eco" },
                                { name: "SafeWork", icon: "security" }
                            ]
                        })
                    },
                    {
                        type: 'services-grid',
                        order: 2,
                        content: JSON.stringify({
                            title: "Temel Hizmetlerimiz",
                            description: "Riskleri azaltmak ve tüm operasyonel yaşam döngünüz boyunca performansı optimize etmek için tasarlanmış özel çözümler.",
                            items: [
                                { title: "Risk Değerlendirmesi", desc: "İş yeri güvenliği ve yasal uyumluluğu sağlamak için kapsamlı tehlike tanımlama.", icon: "analytics" },
                                { title: "Çevre Danışmanlığı", desc: "Çevresel etki değerlendirmeleri ve atık yönetimi stratejileri.", icon: "forest" },
                                { title: "Mühendislik Proje Yönetimi", desc: "Endüstriyel inşaat projeleri için uçtan uca gözetim.", icon: "precision_manufacturing" },
                                { title: "Güvenlik Eğitimi", desc: "Sertifikalı İSG atölyeleri ve özel e-öğrenme modülleri.", icon: "school" },
                                { title: "Uyumluluk Denetimi", desc: "Ulusal ve uluslararası standartlara karşı titiz yasal kontroller.", icon: "fact_check" },
                                { title: "Endüstriyel Hijyen", desc: "Çalışan sağlığını korumak için maruziyet izleme.", icon: "health_and_safety" }
                            ]
                        })
                    },
                    {
                        type: 'featured-case',
                        order: 3,
                        content: JSON.stringify({
                            category: "Vaka Çalışması",
                            title: "Küresel Üretim Güvenliği Revizyonu",
                            text: "Çok uluslu bir üretici için kapsamlı bir İSG yönetim sistemi başarıyla uyguladık ve ilk yıl içinde kayıp zamanlı yaralanmaları %45 azalttık.",
                            buttonText: "Vaka Çalışmasını Oku",
                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6ViqKzCU6oJyAjSaYJDE0fLSLqz-ZKTJKjtRwuv69iCH7Rwyog7WTXzEm5URsI9pZjfrYN5BRu-XIz3wzNovXh5nR_tCDGljKQ82WXdo1uqmHT-x9RLlGv1e1ppenC7vjGmZ4l9hE1vcYVgah5O4vjAOQdWuLJTBhqY7s7XVKhyO6xvs1NHHnqH-pLZ9DughojljBrbS1bbTVKcxF1F2Iu6VN4KGMvrsdqVU6LEh73yxAE-wSdr4wBrvtTW030I5Nt8oTbcjfKmU"
                        })
                    }
                ]
            }
        }
    });


    // 4. Blog (NEW)
    // 4. Blog (NEW)
    await prisma.page.create({
        data: {
            title: 'Blog',
            slug: 'blog',
            description: 'MKY Grup Blog',
            isPublished: true,
            sections: {
                create: [
                    {
                        type: 'blog-hero',
                        order: 0,
                        content: JSON.stringify({
                            title: "HABERLER & <span class='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400'>İÇGÖRÜLER</span>",
                            subtitle: "Güncel Gelişmeler",
                            description: "Uzman ekibimizden iş sağlığı standartları, yapısal mühendislik yenilikleri ve güvenlik uyumluluğu hakkında en son güncellemeler.",
                            badge: "Güncel Gelişmeler",
                            backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFDZyr-QNmb3k0yeL9-kTCDYGJof1QqCXYrDrlQOVE6dKq-EbkCzcmSudJlInLrvVvhpTAJPvdz381JS2P759lk24ODLmrU6q3GvRVAEyO2tqrun4dIsEjJgZt6tMPJMazoC9eQRk6A4R8T02NgjDzCJOFdUgk4WHcjdgxvfmx4M5HvzZohuan5uEVQwTwxZDk1fX83BZoajPIIXbeqzWaEd0a4MuoV2pzLdtq8v_0nFroFNqBv77n4D3GbaETWJYJ8kVZ8gFFjQ0"
                        })
                    },
                    {
                        type: 'blog-content',
                        order: 1,
                        content: JSON.stringify({
                            itemsPerPage: 6,
                            showSearch: true
                        })
                    }
                ]
            }
        }
    });

    // 5. İletişim (NEW)
    // 5. İletişim (NEW)
    await prisma.page.create({
        data: {
            title: 'İletişim',
            slug: 'iletisim',
            description: 'MKY Grup İletişim',
            isPublished: true,
            sections: {
                create: [
                    {
                        type: 'contact-hero',
                        order: 0,
                        content: JSON.stringify({
                            title: "BİZE <span class='text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400'>ULAŞIN</span>",
                            description: "İSG danışmanlığı, yapısal mühendislik soruları veya proje teklifi istemek için uzman ekibimize ulaşın.",
                            badge: "Yardım etmek için buradayız",
                            backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbiEf3-dxxxW6ry5B7urPbpLud0tO1NG8MNYRInTh2FyPbYuHsdcE-p2gcy6N9kG-LdXHWZFjYtJvxQcFPDPtRBiYE-2HzAjp6-ww23INfXhjHfy4bW9iMfum_kB7BArcQYFOkPx1xJVveW_5b0i1otJqFpRCpMvxDztfJZFpnDGfEFPboa4BJDR6IYce5AvAiJpBCjJtTcXFzZrzKDmCfRcksesqgnDH45a0KgBj4DcBsR28N0FC_9pj8bw4YQeUGas9Bl_1diZc"
                        })
                    },
                    {
                        type: 'contact-content',
                        order: 1,
                        content: JSON.stringify({
                            formTitle: "Bize bir mesaj gönderin",
                            infoTitle: "İletişim Bilgileri",
                            infoDesc: "Hızlı iletişimimizle gurur duyuyoruz. Sertifikalı mühendislerimiz ve güvenlik danışmanlarımız özel ihtiyaçlarınızı karşılamaya hazır.",
                            address: "123 Engineering Blvd, Industrial District, NY 10012",
                            phone: "+1 (555) 123-4567",
                            email: "info@mkygrup.com"
                        })
                    }
                ]
            }
        }
    });


    // 6. Home (NEW)
    await prisma.page.upsert({
        where: { slug: 'home' },
        update: {},
        create: {
            title: 'Ana Sayfa',
            slug: 'home',
            description: 'MKY Grup Ana Sayfa',
            isPublished: true,
            sections: {
                create: [
                    {
                        type: 'hero-modern',
                        order: 0,
                        content: JSON.stringify({
                            smallTitle: "ISO 9001 SERTİFİKALI",
                            titleLine1: "GÜVENLİK",
                            titleLine2: "&",
                            titleLine3: "MÜHENDİSLİK",
                            description: "Modern endüstriler için riskleri minimize ediyor, verimliliği maksimize ediyoruz. Güvenlik bir seçenek değil, temeldir."
                        })
                    },
                    {
                        type: 'home-stats',
                        order: 1,
                        content: JSON.stringify({
                            items: [
                                { value: "Sıfır", label: "Kaza", subLabel: "Güvenlik Kaydı", icon: "verified_user" },
                                { value: "20+", label: "Yıl", subLabel: "Deneyim", icon: "history" },
                                { value: "9001", label: "& 45001", subLabel: "ISO Sertifikalı", icon: "gavel" },
                                { value: "50+", label: "Mühendis", subLabel: "Uzmanlar", icon: "group" }
                            ]
                        })
                    },
                    {
                        type: 'home-services',
                        order: 2,
                        content: JSON.stringify({
                            title: "Endüstriyel güvenlik ve yapısal bütünlük için kapsamlı uzmanlık.",
                            subtitle: "Hizmetlerimiz",
                            description: "Operasyonlarınızın sorunsuz ve güvenli bir şekilde yürümesi için teknik hassasiyeti mevzuat bilgisiyle birleştiriyoruz.",
                            items: [
                                { title: "İSG Danışmanlığı", description: "Kapsamlı risk değerlendirmeleri, yerel düzenlemelere uygunluk ve güvenlik eğitim.", icon: "safety_check", link: "/hizmetlerimiz" },
                                { title: "Yapısal Mühendislik", description: "Endüstriyel tesisler için gelişmiş tasarım analizi ve yapısal bütünlük testleri.", icon: "precision_manufacturing", link: "/hizmetlerimiz" },
                                { title: "Çevre Hizmetleri", description: "Çevresel etki değerlendirmeleri ve atık yönetimi optimizasyon stratejileri.", icon: "eco", link: "/hizmetlerimiz" }
                            ]
                        })
                    },
                    {
                        type: 'home-projects',
                        order: 3,
                        content: JSON.stringify({
                            title: "Öne Çıkan Projeler",
                            description: "En son mühendislik ve güvenlik başarılarımızı keşfedin.",
                            items: [
                                { title: "Petrokimya Güvenlik Denetimi", location: "Houston, TX", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQRGNqcxpUtMQQJZnITkyvF0seOImEPC-ZG37ZtKZ3pNknLep31mFDYpBaykQnGyKa8jTzZKuz9h5ENn7OZlEAwre5r4hGj4X_4sUrNwu2U5Ke6g3Rw4BiXpxGgD6AzwH8JrWVAQdgnkTGsfGLDs-Xh4TZ-ur6_rcZcsOqbNAqd0Mt_Dpp8JSTyJFkUkHa501Nmjd9HMQgRREm14fy8Gd38SyABKWpvzRwbiKrFE9OcPkb-2r4Ep--AtpkHtYB3Mhcht8XfRFtRPg", link: "/hizmetlerimiz" },
                                { title: "Lojistik Merkezi Yapısı", location: "Chicago, IL", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1Y1cr1NcQlxjEoAEGobzuDjU_jyq9N1Kpcuhs6igMTm69y-_7O9x_TC_jlYNlvlSR0MF1KiIdLoSdGI1UIthGHxjveBGYCQopRuCzpVXO_YNZY3il6ezZ5fGYCPuRH-wwcQtGZW5jgsjhMwgbMzCrzG8SMZOe_KQsAvyKxkvS1ruQ6zDmXrPMq6xCnUqxGms2BogdEiJPFJwhwC_UFuqkh0tsEMDmgZ0wu7ILyVQctKpKFDiYkk49sKNPWBSrAW-YLnaQ4atqm0s", link: "/hizmetlerimiz" },
                                { title: "Yeşil Enerji Entegrasyonu", location: "Denver, CO", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnPMJSf8rywKnYDkucS1gZAJpPNRjy0AM-PZwM9VE0vUqpfY51WXyIlbH3-Yoo7fQEHkIaVMTHuwvzc1g6AAa6QwRRBMB2Hw3TR9kEYw3aowewW_EpzFLLWOL7Z3OZUwNOoxlQpjXbS678pdwCS8xBu0dwJjsDSAbifG7Z-2bi2LSNC8QwSwPyIB684r0MzUoEUaIxDFoE2OC4tcDwhFxA22SgtqWAQGj5qJEplAUiqTiFZZ2VFhCo6ajTqOEK9ztSxDcwdVJ30H0", link: "/hizmetlerimiz" }
                            ]
                        })
                    },
                    {
                        type: 'home-cta',
                        order: 4,
                        content: JSON.stringify({
                            title: "Güvenlik standartlarınızı yükseltmeye hazır mısınız?",
                            text: "Proje gereksinimlerinizi görüşmek için sertifikalı mühendislerimizle bugün iletişime geçin.",
                            buttonText: "Teklif Al",
                            buttonLink: "/iletisim",
                            secondaryButtonText: "Destek İletişim",
                            secondaryButtonLink: "/iletisim"
                        })
                    }
                ]
            }
        }
    });

    console.log('Seeding completed.');
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error('SEEDING ERROR:', e);
        if (e instanceof Error) {
            console.error('Error message:', e.message);
            console.error('Stack:', e.stack);
        }
        await prisma.$disconnect()
        process.exit(1)
    });
