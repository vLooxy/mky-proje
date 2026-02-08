"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth-actions";
import Link from "next/link";

export default function AdminLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError("");

        try {
            const result = await login(null, formData);
            if (result.success) {
                router.push("/admin");
            } else {
                setError(result.message || "Giriş başarısız.");
                setLoading(false);
            }
        } catch {
            setError("Bir hata oluştu.");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
            <div className="w-full max-w-md bg-white dark:bg-[#1a2632] rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8 md:p-10">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                        <span className="material-symbols-outlined text-2xl">shield_lock</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Yönetici Girişi</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Devam etmek için lütfen kimliğinizi doğrulayın.</p>
                </div>

                <form action={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Kullanıcı Adı
                        </label>
                        <div className="relative">
                            <input
                                name="username"
                                type="text"
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all"
                                placeholder="Giriş yapınız"
                            />
                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">person</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Şifre
                        </label>
                        <div className="relative">
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all"
                                placeholder="••••••••"
                            />
                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">lock</span>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">error</span>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>Giriş Yap</span>
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                    <Link href="/" className="text-sm text-slate-500 hover:text-primary transition-colors inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                        Siteye Dön
                    </Link>
                </div>
            </div>
        </div>
    );
}
