"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

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
    const username = formData.get("username") as string; // acting as email for now if needed, or we adapt
    const password = formData.get("password") as string;

    // Rate Limit Check
    const key = `auth_${username}`;
    const now = Date.now();
    const limitData = rateLimits.get(key) || { attempts: 0, blockExpires: 0 };

    if (limitData.blockExpires > now) {
        const remainingMins = Math.ceil((limitData.blockExpires - now) / 60000);
        return { success: false, message: `Çok fazla başarısız deneme. Lütfen ${remainingMins} dakika sonra tekrar deneyin.` };
    }

    // Credentials from Env (Fallback/Seed)
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;

    try {
        // 1. Try to find user in DB
        // We assume username field in login form is actually email or username. 
        // Let's check against email first, then name? Or just assume it's one.
        // For existing env usage, username was likely 'admin'.
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: username },
                    { name: username }
                ]
            }
        });

        // 2. Fallback: If no users exist AT ALL, and credentials match env, create the admin user.
        if (!user) {
            const userCount = await prisma.user.count();
            if (userCount === 0 && ADMIN_USER && ADMIN_PASS && username === ADMIN_USER && password === ADMIN_PASS) {
                // Auto-seed admin
                const hashedPassword = await bcrypt.hash(ADMIN_PASS, 10);
                user = await prisma.user.create({
                    data: {
                        name: "Yönetici Mod",
                        email: "admin@mkygrup.com", // Default email
                        password: hashedPassword,
                        role: "ADMIN",
                        image: undefined
                    }
                });
            }
        }

        if (user) {
            // Check password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Success - Reset rate limit
                rateLimits.delete(key);

                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 1); // 1 day

                // Store user info in session/cookie if needed, or just the flag
                const cookieStore = await cookies();
                cookieStore.set("admin_session", "true", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/",
                    expires: expirationDate,
                });

                // You might want to store user ID too
                cookieStore.set("admin_user_id", user.id, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/",
                    expires: expirationDate,
                });

                return { success: true };
            }
        }

        // Failure
        limitData.attempts += 1;
        if (limitData.attempts >= MAX_ATTEMPTS) {
            limitData.blockExpires = now + RATELIMIT_WINDOW;
        }
        rateLimits.set(key, limitData);

        return { success: false, message: `Geçersiz kullanıcı adı veya şifre. (${MAX_ATTEMPTS - limitData.attempts} hak kaldı)` };

    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "Giriş işlemi sırasında bir hata oluştu." };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    cookieStore.delete("admin_user_id");
    redirect("/admin/login");
}
