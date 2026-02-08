
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from "./ContactForm";

interface ContactContentProps {
    formTitle?: string;
    infoTitle?: string;
    infoDesc?: string;
    address?: string;
    phone?: string;
    email?: string;
}

export function ContactContent({
    formTitle = "Bize bir mesaj gönderin",
    infoTitle = "İletişim Bilgileri",
    infoDesc = "Hızlı iletişimimizle gurur duyuyoruz. Sertifikalı mühendislerimiz ve güvenlik danışmanlarımız özel ihtiyaçlarınızı karşılamaya hazır.",
    address = "123 Engineering Blvd, Industrial District, NY 10012",
    phone = "+1 (555) 123-4567",
    email = "info@mkygrup.com"
}: ContactContentProps) {

    // Static items for layout fidelity
    const contactItems = [
        { icon: "location_on", title: "Genel Merkez", line1: address, line2: "Industrial District, NY 10012", action: null },
        { icon: "call", title: "Telefon", line1: phone, line2: "Pzt-Cum 08:00 - 18:00", action: "call" },
        { icon: "mail", title: "E-posta", line1: email, line2: "ik@mkygrup.com", action: "mail" }
    ];

    return (
        <section className="relative z-20 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                    <div className="lg:col-span-7">
                        <FadeIn direction="right" delay={400}>
                            <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-xl p-6 md:p-10 border border-slate-100 dark:border-slate-800 h-full">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                                    {formTitle}
                                </h2>
                                <ContactForm />
                            </div>
                        </FadeIn>
                    </div>
                    <div className="lg:col-span-5 flex flex-col justify-end lg:pb-10 pt-10 lg:pt-32">
                        <FadeIn direction="left" delay={500}>
                            <div className="lg:pl-8">
                                <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">
                                    {infoTitle}
                                </span>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                    Birlikte daha güvenli bir gelecek inşa edelim
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-lg">
                                    {infoDesc}
                                </p>
                                <div className="space-y-8">
                                    {contactItems.map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 group">
                                            <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                                                <span className="material-symbols-outlined text-2xl">
                                                    {item.icon}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                                    {item.title}
                                                </h4>
                                                <div className={`text-slate-600 dark:text-slate-400 leading-relaxed ${item.action ? 'hover:text-primary transition-colors cursor-pointer' : ''}`}>
                                                    <p>{item.line1}</p>
                                                    {item.icon === "call" ? (
                                                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mt-1">{item.line2}</span>
                                                    ) : (
                                                        <p>{item.line2}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
