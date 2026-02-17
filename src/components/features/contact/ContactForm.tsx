
"use client";

import { submitForm } from "@/actions/form-actions";
import { useState } from "react";

export function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setMessage(null);

        try {
            const result = await submitForm(null, formData);
            if (result.success) {
                setMessage({ success: true, text: result.message });
                const form = document.getElementById("contact-form") as HTMLFormElement;
                if (form) form.reset();
            } else {
                setMessage({ success: false, text: result.message });
            }
        } catch {
            setMessage({ success: false, text: "Bir hata oluştu. Lütfen tekrar deneyin." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form id="contact-form" action={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                        htmlFor="name"
                    >
                        Ad Soyad
                    </label>
                    <input
                        className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow px-4 py-2"
                        id="name"
                        name="name"
                        placeholder="Adınız Soyadınız"
                        type="text"
                        required
                    />
                </div>
                <div>
                    <label
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                        htmlFor="email"
                    >
                        E-posta Adresi
                    </label>
                    <input
                        className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow px-4 py-2"
                        id="email"
                        name="email"
                        placeholder="info@mkygrup.com"
                        type="email"
                        required
                    />
                </div>
            </div>
            <div>
                <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    htmlFor="subject"
                >
                    Konu
                </label>
                <select
                    className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow px-4 py-2"
                    id="subject"
                    name="subject"
                >
                    <option value="general">Genel Bilgi</option>
                    <option value="proposal">Teklif İste</option>
                    <option value="audit_request">İSG Denetim Talebi</option>
                    <option value="engineering">Mühendislik Danışmanlığı</option>
                    <option value="career">Kariyer</option>
                </select>
            </div>
            <div>
                <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    htmlFor="file"
                >
                    Dosya Ekle (PDF, ZIP, RAR, Resim)
                </label>
                <input
                    className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-600"
                    id="file"
                    name="file"
                    type="file"
                    accept=".pdf,.zip,.rar,.jpeg,.jpg,.png"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const validTypes = [
                                "application/pdf",
                                "application/zip",
                                "application/x-zip-compressed",
                                "application/vnd.rar",
                                "application/x-rar-compressed",
                                "application/x-rar",
                                "image/jpeg",
                                "image/png"
                            ];

                            // Check validation based on extension as well since MIME types can be inconsistent
                            const validExtensions = ['pdf', 'zip', 'rar', 'jpeg', 'jpg', 'png'];
                            const extension = file.name.split('.').pop()?.toLowerCase();

                            if (!validTypes.includes(file.type) && !validExtensions.includes(extension || '')) {
                                alert("Sadece PDF, ZIP, RAR, JPEG ve PNG dosyaları yükleyebilirsiniz.");
                                e.target.value = "";
                                return;
                            }
                            if (file.size > 20 * 1024 * 1024) {
                                alert("Dosya boyutu 20MB'dan küçük olmalıdır.");
                                e.target.value = "";
                                return;
                            }
                        }
                    }}
                />
                <p className="mt-1 text-xs text-slate-500">Maksimum dosya boyutu: 20MB. (PDF, ZIP, RAR, JPEG, PNG)</p>
            </div>
            <div>
                <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    htmlFor="message"
                >
                    Mesaj
                </label>
                <textarea
                    className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow px-4 py-2"
                    id="message"
                    name="message"
                    placeholder="Projenizle ilgili size nasıl yardımcı olabiliriz?"
                    rows={5}
                    required
                ></textarea>
            </div>

            {message && (
                <div className={`p-4 rounded-lg text-sm ${message.success ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {message.text}
                </div>
            )}

            <button
                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                {!loading && (
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                        send
                    </span>
                )}
            </button>
        </form>
    );
}
