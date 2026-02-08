"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Simple in-memory rate limiting (Note: This resets on server restart/redeploy)
// For production with multiple replicas, use Redis or Database.
const RATELIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

interface RateLimitData {
    attempts: number;
    blockExpires: number;
}

// Map IP to rate limit data
const rateLimits = new Map<string, RateLimitData>();

export async function login(prevState: unknown, formData: FormData) {
    // In a real app we'd get the real IP, but in Server Actions headers() might be needed
    // For simplicity in this demo, we'll use a placeholder or try to get it if possible.
    // Since we can't easily get client IP in standard Server Action without headers(),
    // we'll rely on the user input (username) as the key for rate limiting to prevent brute force on a specific account.
    // AND/OR we can use a hidden field for client-side fingerprinting if needed, but username is okay for now.

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Rate Limit Check
    const key = `auth_${username}`; // Key by username to prevent brute forcing 'admin'
    const now = Date.now();
    const limitData = rateLimits.get(key) || { attempts: 0, blockExpires: 0 };

    if (limitData.blockExpires > now) {
        const remainingMins = Math.ceil((limitData.blockExpires - now) / 60000);
        return { success: false, message: `Çok fazla başarısız deneme. Lütfen ${remainingMins} dakika sonra tekrar deneyin.` };
    }

    // Credentials from Env
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;

    if (!ADMIN_USER || !ADMIN_PASS) {
        return { success: false, message: "Sunucu hatası: Giriş bilgileri yapılandırılmamış." };
    }

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        // Success - Reset rate limit
        rateLimits.delete(key);

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1); // 1 day

        (await cookies()).set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            expires: expirationDate,
        });

        return { success: true };
    } else {
        // Failure - Increment rate limit
        limitData.attempts += 1;

        if (limitData.attempts >= MAX_ATTEMPTS) {
            limitData.blockExpires = now + RATELIMIT_WINDOW;
        }

        rateLimits.set(key, limitData);

        return { success: false, message: `Geçersiz kullanıcı adı veya şifre. (${MAX_ATTEMPTS - limitData.attempts} hak kaldı)` };
    }
}

export async function logout() {
    (await cookies()).delete("admin_session");
    redirect("/admin/login");
}
