
export type SectionType =
    'home-hero' | 'home-stats' | 'home-services' | 'home-projects' | 'home-cta' |
    'hero' | 'text' | 'features' |
    'hero-modern' | 'layered-content' | 'values-grid' | 'timeline' | 'team-grid' |
    'page-header' | 'stats-section' | 'projects-slider' | 'cta-banner' |
    'trust-logos' | 'trust-indicators' | 'services-grid' | 'featured-case' | 'contact-block' | 'blog-grid' |
    'about-purpose' | 'mission-hero' | 'blog-hero' | 'blog-content' | 'contact-hero' | 'contact-content' |
    'faq-accordion' | 'comparison-table' | 'modern-stats' | 'testimonials-slider' | 'masonry-gallery';

export interface SectionContent {
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface Section {
    id: string;
    type: SectionType;
    content: string; // JSON string from DB
    order: number;
}

export interface EditorSection {
    id: string;
    type: SectionType;
    content: SectionContent; // Parsed JSON
    order: number;
    isNew?: boolean;
}

export const SECTION_TEMPLATES: Record<SectionType, SectionContent> = {
    // --- HOME PAGE CUSTOM COMPONENTS ---
    'home-hero': {
        badge: "ISO 9001 Sertifikalı Güvenlik",
        title_line1: "MÜKEMMELİYET",
        title_highlight: "MÜHENDİSLİĞİ",
        description: "Modern endüstriler için riskleri minimize ediyor, verimliliği maksimize ediyoruz. Güvenlik bir seçenek değil, temeldir.",
        button_primary: "Danışmanlık Alın",
        button_secondary: "Hizmetlerimiz",
        backgroundImage: "https://images.pexels.com/photos/1038935/pexels-photo-1038935.jpeg"
    },
    'home-stats': {
        items: [
            { value: "Sıfır", label: "Kaza", subLabel: "Güvenlik Kaydı", icon: "verified_user" },
            { value: "20+", label: "Yıl", subLabel: "Deneyim", icon: "history" },
            { value: "9001", label: "& 45001", subLabel: "ISO Sertifikalı", icon: "gavel" },
            { value: "50+", label: "Mühendis", subLabel: "Uzmanlar", icon: "group" }
        ]
    },
    'home-services': {
        subtitle: "Hizmetlerimiz",
        title: "Endüstriyel güvenlik ve yapısal bütünlük için kapsamlı uzmanlık.",
        description: "Operasyonlarınızın sorunsuz ve güvenli bir şekilde yürümesi için teknik hassasiyeti mevzuat bilgisiyle birleştiriyoruz.",
        items: [
            {
                title: "İSG Danışmanlığı",
                description: "Kapsamlı risk değerlendirmeleri, yerel düzenlemelere uygunluk denetimleri ve iş gücünüz için özel güvenlik eğitim programları.",
                icon: "safety_check",
                link: "/hizmetlerimiz"
            },
            {
                title: "Yapısal Mühendislik",
                description: "Endüstriyel tesisler için gelişmiş tasarım analizi, yapısal bütünlük testleri ve tam kapsamlı proje yönetimi.",
                icon: "precision_manufacturing",
                link: "/hizmetlerimiz"
            },
            {
                title: "Çevre Hizmetleri",
                description: "Çevresel etki değerlendirmeleri (ÇED), sürdürülebilirlik planlaması ve atık yönetimi optimizasyon stratejileri.",
                icon: "eco",
                link: "/hizmetlerimiz"
            }
        ]
    },
    'home-projects': {
        title: "Öne Çıkan Projeler",
        description: "En son mühendislik ve güvenlik başarılarımızı keşfedin.",
        items: [
            {
                title: "Petrokimya Güvenlik Denetimi",
                location: "Houston, TX",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQRGNqcxpUtMQQJZnITkyvF0seOImEPC-ZG37ZtKZ3pNknLep31mFDYpBaykQnGyKa8jTzZKuz9h5ENn7OZlEAwre5r4hGj4X_4sUrNwu2U5Ke6g3Rw4BiXpxGgD6AzwH8JrWVAQdgnkTGsfGLDs-Xh4TZ-ur6_rcZcsOqbNAqd0Mt_Dpp8JSTyJFkUkHa501Nmjd9HMQgRREm14fy8Gd38SyABKWpvzRwbiKrFE9OcPkb-2r4Ep--AtpkHtYB3Mhcht8XfRFtRPg",
                link: "/hizmetlerimiz"
            },
            {
                title: "Lojistik Merkezi Yapısı",
                location: "Chicago, IL",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1Y1cr1NcQlxjEoAEGobzuDjU_jyq9N1Kpcuhs6igMTm69y-_7O9x_TC_jlYNlvlSR0MF1KiIdLoSdGI1UIthGHxjveBGYCQopRuCzpVXO_YNZY3il6ezZ5fGYCPuRH-wwcQtGZW5jgsjhMwgbMzCrzG8SMZOe_KQsAvyKxkvS1ruQ6zDmXrPMq6xCnUqxGms2BogdEiJPFJwhwC_UFuqkh0tsEMDmgZ0wu7ILyVQctKpKFDiYkk49sKNPWBSrAW-YLnaQ4atqm0s",
                link: "/hizmetlerimiz"
            },
            {
                title: "Yeşil Enerji Entegrasyonu",
                location: "Denver, CO",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnPMJSf8rywKnYDkucS1gZAJpPNRjy0AM-PZwM9VE0vUqpfY51WXyIlbH3-Yoo7fQEHkIaVMTHuwvzc1g6AAa6QwRRBMB2Hw3TR9kEYw3aowewW_EpzFLLWOL7Z3OZUwNOoxlQpjXbS678pdwCS8xBu0dwJjsDSAbifG7Z-2bi2LSNC8QwSwPyIB684r0MzUoEUaIxDFoE2OC4tcDwhFxA22SgtqWAQGj5qJEplAUiqTiFZZ2VFhCo6ajTqOEK9ztSxDcwdVJ30H0",
                link: "/hizmetlerimiz"
            }
        ]
    },
    'home-cta': {
        title: "Güvenlik standartlarınızı yükseltmeye hazır mısınız?",
        text: "Proje gereksinimlerinizi görüşmek için sertifikalı mühendislerimizle bugün iletişime geçin.",
        buttonText: "Teklif Al",
        secondaryButtonLink: "/iletisim"
    },

    // --- KURUMSAL PAGES CUSTOM COMPONENTS ---
    'about-purpose': {
        subtitle: "Amacımız",
        title: "Endüstri Standartlarını İleriye Taşıyoruz",
        description: "Sadece yönetmelikleri takip etmiyoruz; inovasyon ve titiz mühendislik uygulamalarıyla endüstriyel güvenliğin geleceğini şekillendiriyoruz.",
        visionTitle: "Vizyonumuz",
        visionDesc: "Güvenlik ve mühendislik bütünlüğünde küresel referans noktası olmak; endüstriyel ilerleme ve insan güvenliğinin mükemmel bir uyum içinde olduğu, kalite veya yaşamdan ödün verilmeyen bir dünya yaratmak.",
        missionTitle: "Misyonumuz",
        missionDesc: "Endüstrileri hassas mühendislik çözümleri ve kapsamlı güvenlik stratejileriyle güçlendirmek; riski en aza indirmek, verimliliği maksimize etmek ve her çalışanın her gün evine güvenle dönmesini sağlamak."
    },
    'mission-hero': {
        smallTitle: "MKY GRUP",
        titleLine1: "GELECEK",
        titleLine2: "İÇİN",
        titleLine3: "GÜVENLİK",
        description: "Sadece yapıları sağlamlaştırmıyoruz; yarının endüstriyel standartlarını ve çalışma kültürünü inşa ediyoruz."
    },
    'trust-indicators': {
        title: "Dünya çapında endüstri liderleri tarafından güvenilmektedir",
        items: [
            { name: "ISO 9001", icon: "verified_user" },
            { name: "OSHA Compliant", icon: "shield" },
            { name: "LEED Certified", icon: "eco" },
            { name: "SafeWork", icon: "security" }
        ]
    },
    'blog-hero': {
        title: "HABERLER & <span class='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400'>İÇGÖRÜLER</span>",
        subtitle: "Güncel Gelişmeler",
        description: "Uzman ekibimizden iş sağlığı standartları, yapısal mühendislik yenilikleri ve güvenlik uyumluluğu hakkında en son güncellemeler.",
        badge: "Güncel Gelişmeler",
        backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFDZyr-QNmb3k0yeL9-kTCDYGJof1QqCXYrDrlQOVE6dKq-EbkCzcmSudJlInLrvVvhpTAJPvdz381JS2P759lk24ODLmrU6q3GvRVAEyO2tqrun4dIsEjJgZt6tMPJMazoC9eQRk6A4R8T02NgjDzCJOFdUgk4WHcjdgxvfmx4M5HvzZohuan5uEVQwTwxZDk1fX83BZoajPIIXbeqzWaEd0a4MuoV2pzLdtq8v_0nFroFNqBv77n4D3GbaETWJYJ8kVZ8gFFjQ0"
    },
    'blog-content': {
        itemsPerPage: 6,
        showSearch: true
    },
    'contact-hero': {
        title: "BİZE <span class='text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400'>ULAŞIN</span>",
        description: "İSG danışmanlığı, yapısal mühendislik soruları veya proje teklifi istemek için uzman ekibimize ulaşın.",
        badge: "Yardım etmek için buradayız",
        backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbiEf3-dxxxW6ry5B7urPbpLud0tO1NG8MNYRInTh2FyPbYuHsdcE-p2gcy6N9kG-LdXHWZFjYtJvxQcFPDPtRBiYE-2HzAjp6-ww23INfXhjHfy4bW9iMfum_kB7BArcQYFOkPx1xJVveW_5b0i1otJqFpRCpMvxDztfJZFpnDGfEFPboa4BJDR6IYce5AvAiJpBCjJtTcXFzZrzKDmCfRcksesqgnDH45a0KgBj4DcBsR28N0FC_9pj8bw4YQeUGas9Bl_1diZc"
    },
    'contact-content': {
        formTitle: "Bize bir mesaj gönderin",
        infoTitle: "İletişim Bilgileri",
        infoDesc: "Hızlı iletişimimizle gurur duyuyoruz. Sertifikalı mühendislerimiz ve güvenlik danışmanlarımız özel ihtiyaçlarınızı karşılamaya hazır.",
        address: "123 Engineering Blvd, Industrial District, NY 10012",
        phone: "+1 (555) 123-4567",
        email: "info@mkygrup.com"
    },

    // --- GENERIC / OTHER COMPONENTS ---
    hero: {
        title: "Başlık Buraya",
        subtitle: "Alt başlık alanı",
        backgroundImage: "",
        buttonText: "Daha Fazla",
        buttonLink: "#"
    },
    'page-header': {
        title: "Sayfa Başlığı",
        description: "Sayfa açıklaması buraya gelecek.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWFffgFKdMSVfadfLO-wz6xPxo8RGuXYcTOJV-1WCOPAIpEeki_yiXycGYTUrKgMUOG1eUdfMnOTM_29bhhzeyyVOIxvVT04gIDV978njbvgudQVHuxfejqFBsNh46K7DeUW08AZZUYbQOFrG03GmpFZ0QOC7Qr38SuccACifqDWD2gqLrZpDjpz-QCL1Fye8orJtxE48xedbl62xm24A2Kfv-4TZ1vojfaatPOeNjiE2W2hS5WYeOAjwyvryg09eGwY3vrHNQvjQ",
        height: "h-[50vh]"
    },
    'stats-section': {
        items: [
            { value: "30+", label: "Yıllık Tecrübe", icon: "calendar_month" },
            { value: "500+", label: "Tamamlanan Proje", icon: "domain" },
            { value: "20+", label: "Hizmet Verilen Ülke", icon: "public" },
            { value: "100%", label: "Müşteri Memnuniyeti", icon: "verified_user" }
        ]
    },
    'projects-slider': {
        title: "Öne Çıkan Projeler",
        subtitle: "Mükemmellik Portföyümüz",
        items: [
            { title: "Metro İstasyonu Güçlendirmesi", location: "İstanbul", image: "https://images.unsplash.com/photo-1590644365607-1c5a38fc43e0" },
            { title: "Endüstriyel Tesis Denetimi", location: "Kocaeli", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122" }
        ]
    },
    'cta-banner': {
        title: "Projenizi Başlatmaya Hazır mısınız?",
        text: "Uzman ekibimiz size özel çözümler sunmak için hazır.",
        buttonText: "Teklif Alın",
        buttonLink: "/iletisim"
    },
    'trust-logos': {
        title: "Dünya çapında endüstri liderleri tarafından güvenilmektedir",
        items: [
            { name: "ISO 9001", icon: "verified_user" },
            { name: "OSHA Compliant", icon: "shield" },
            { name: "LEED Certified", icon: "eco" },
            { name: "SafeWork", icon: "security" }
        ]
    },
    'services-grid': {
        title: "Temel Hizmetlerimiz",
        description: "Riskleri azaltmak ve performansı optimize etmek için özel çözümler.",
        items: [
            { title: "Risk Değerlendirmesi", desc: "Kapsamlı tehlike analizi.", icon: "analytics" },
            { title: "Çevre Danışmanlığı", desc: "Sürdürülebilirlik raporlaması.", icon: "forest" }
        ]
    },
    'featured-case': {
        category: "Vaka Çalışması",
        title: "Küresel Üretim Güvenliği Revizyonu",
        text: "Çok uluslu bir üretici için kapsamlı İSG sistemi uyguladık.",
        buttonText: "Vaka Çalışmasını Oku",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6ViqKzCU6oJyAjSaYJDE0fLSLqz-ZKTJKjtRwuv69iCH7Rwyog7WTXzEm5URsI9pZjfrYN5BRu-XIz3wzNovXh5nR_tCDGljKQ82WXdo1uqmHT-x9RLlGv1e1ppenC7vjGmZ4l9hE1vcYVgah5O4vjAOQdWuLJTBhqY7s7XVKhyO6xvs1NHHnqH-pLZ9DughojljBrbS1bbTVKcxF1F2Iu6VN4KGMvrsdqVU6LEh73yxAE-wSdr4wBrvtTW030I5Nt8oTbcjfKmU"
    },
    'contact-block': {
        formTitle: "Bize bir mesaj gönderin",
        infoTitle: "İletişim Bilgileri",
        infoDesc: "Hızlı iletişimimizle gurur duyuyoruz.",
        address: "123 Engineering Blvd, Industrial District, NY 10012",
        phone: "+1 (555) 123-4567",
        email: "info@mkygrup.com"
    },
    'blog-grid': {
        title: "Haberler & İçgörüler",
        showSearch: true,
        itemsPerPage: 6
    },
    'hero-modern': {
        smallTitle: "MKY Grup",
        titleLine1: "GELECEK",
        titleLine2: "İÇİN",
        titleLine3: "GÜVENLİK",
        description: "Sadece yapıları sağlamlaştırmıyoruz; yarının endüstriyel standartlarını ve çalışma kültürünü inşa ediyoruz."
    },
    'layered-content': {
        bgText: "MİS",
        image: "https://images.unsplash.com/photo-1581094794329-cd119277f82e",
        number: "01",
        category: "Misyonumuz",
        titlePart1: "Endüstriyi",
        titlePart2: "Dönüştürmek",
        description: "Misyonumuz, mühendislik mükemmelliği ile iş güvenliği kültürünü birleştirerek...",
        list: [
            "Sıfır kaza hedefiyle çalışma",
            "Yenilikçi mühendislik çözümleri",
            "Sürdürülebilir büyüme odaklı yaklaşım"
        ],
        stats: [],
        reverse: false
    },
    'values-grid': {
        title: "Değerlerimiz",
        subtitle: "Bizi Biz Yapanlar",
        items: [
            { title: "Dürüstlük", desc: "Şeffaflık ve etik değerler...", icon: "verified" },
            { title: "İnovasyon", desc: "Sürekli gelişim...", icon: "lightbulb" }
        ]
    },
    'timeline': {
        title: "Yolculuğumuz",
        subtitle: "On Yılların Mükemmelliği",
        items: [
            { year: "1993", title: "Kuruluş", desc: "New York'ta kuruldu." }
        ]
    },
    'team-grid': {
        title: "Liderlik",
        subtitle: "Uzmanlarımızla Tanışın",
        items: [
            { name: "Ad Soyad", role: "Unvan", desc: "Açıklama", image: "" }
        ]
    },
    text: {
        html: "<p>Buraya metin giriniz...</p>"
    },
    features: {
        title: "Özelliklerimiz",
        items: [
            { title: "Özellik 1", description: "Açıklama" },
            { title: "Özellik 2", description: "Açıklama" }
        ]
    },

    // --- NEW MODERN COMPONENTS ---
    'faq-accordion': {
        title: "Sıkça Sorulan Sorular",
        subtitle: "Merak Ettikleriniz",
        items: [
            { question: "Hizmet süreçleriniz nasıl işliyor?", answer: "İlk olarak ihtiyaç analizi yapıyor, ardından size özel bir proje planı oluşturuyoruz. Onayınızla birlikte uygulama aşamasına geçiyoruz." },
            { question: "Hangi sektörlere hizmet veriyorsunuz?", answer: "İnşaat, enerji, üretim ve lojistik başta olmak üzere birçok endüstriyel sektöre mühendislik ve güvenlik çözümleri sunuyoruz." },
            { question: "Projelerinizde garanti veriyor musunuz?", answer: "Evet, tüm mühendislik ve danışmanlık hizmetlerimiz uluslararası standartlara (ISO, OSHA) uygunluk garantisi altındadır." }
        ]
    },
    'comparison-table': {
        title: "Paket Karşılaştırması",
        subtitle: "İhtiyacınıza Uygun Çözümü Seçin",
        columns: ["Özellik", "Başlangıç", "Profesyonel", "Kurumsal"],
        rows: [
            { feature: "İSG Denetimi", val1: "Yıllık", val2: "Aylık", val3: "Haftalık" },
            { feature: "Risk Analizi", val1: "✓", val2: "✓", val3: "✓" },
            { feature: "Acil Eylem Planı", val1: "✗", val2: "✓", val3: "✓" },
            { feature: "7/24 Destek", val1: "✗", val2: "✗", val3: "✓" }
        ]
    },
    'modern-stats': {
        items: [
            { value: "98", label: "Proje Başarısı", type: "circle", suffix: "%" },
            { value: "450", label: "Mutlu Müşteri", type: "number", suffix: "+" },
            { value: "15", label: "Global Ödül", type: "number", suffix: "" },
            { value: "100", label: "Güvenlik Uyumu", type: "bar", suffix: "%" }
        ]
    },
    'testimonials-slider': {
        title: "Müşterilerimiz Ne Diyor?",
        items: [
            { name: "Ahmet Yılmaz", role: "Operasyon Müdürü, ABC Lojistik", quote: "MKY Grup ile çalışmak iş güvenliği standartlarımızı tamamen değiştirdi. Profesyonellikleri etkileyici.", image: "https://randomuser.me/api/portraits/men/32.jpg" },
            { name: "Ayşe Kaya", role: "CEO, TechYapı", quote: "Mühendislik çözümleri sayesinde projemizi zamanından önce ve bütçe dahilinde tamamladık.", image: "https://randomuser.me/api/portraits/women/44.jpg" },
            { name: "Mehmet Demir", role: "Fabrika Müdürü, Sanayi A.Ş.", quote: "Risk analizlerindeki titizlikleri, potansiyel kazaları önlememizde kritik rol oynadı.", image: "https://randomuser.me/api/portraits/men/67.jpg" }
        ]
    },
    'masonry-gallery': {
        title: "Proje Galerisi",
        description: "Sahadan kareler ve tamamlanan projelerimizden seçkiler.",
        images: [
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1581094794329-cd119277f82e?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
        ]
    }
};
