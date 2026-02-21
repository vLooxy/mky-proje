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

// --- Rate Limit Helpers ---
function getRateLimitStatus(username: string) {
    const key = `auth_${username}`;
    const now = Date.now();
    const limitData = rateLimits.get(key) || { attempts: 0, blockExpires: 0 };

    if (limitData.blockExpires > now) {
        const remainingMins = Math.ceil((limitData.blockExpires - now) / 60000);
        return { isBlocked: true, message: `Çok fazla başarısız deneme. Lütfen ${remainingMins} dakika sonra tekrar deneyin.` };
    }
    return { isBlocked: false, key, limitData, now };
}

function recordFailedAttempt(key: string, limitData: RateLimitData, now: number) {
    limitData.attempts += 1;
    if (limitData.attempts >= MAX_ATTEMPTS) {
        limitData.blockExpires = now + RATELIMIT_WINDOW;
    }
    rateLimits.set(key, limitData);
    return `Geçersiz kullanıcı adı veya şifre. (${MAX_ATTEMPTS - limitData.attempts} hak kaldı)`;
}

// --- Auth Core Helpers ---
async function findOrSeedUser(username: string, password?: string) {
    let user = await prisma.user.findFirst({
        where: { OR: [{ email: username }, { name: username }] },
        include: { role: true }
    });

    if (!user) {
        const ADMIN_USER = process.env.ADMIN_USER;
        const ADMIN_PASS = process.env.ADMIN_PASS;
        const userCount = await prisma.user.count();

        if (userCount === 0 && ADMIN_USER && ADMIN_PASS && username === ADMIN_USER && password === ADMIN_PASS) {
            const hashedPassword = await bcrypt.hash(ADMIN_PASS, 10);
            user = await prisma.user.create({
                data: {
                    name: "Yönetici Mod",
                    email: "admin@mkygrup.com",
                    password: hashedPassword,
                    role: { connect: { name: "Yönetici" } },
                },
                include: { role: true }
            });
        }
    }
    return user;
}

async function setSessionCookies(userId: string) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1); // 1 day

    const cookieStore = await cookies();
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" as const,
        path: "/",
        expires: expirationDate,
    };

    cookieStore.set("admin_session", "true", cookieOptions);
    cookieStore.set("admin_user_id", userId, cookieOptions);
}

export async function login(prevState: unknown, formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const rateLimit = getRateLimitStatus(username);
    if (rateLimit.isBlocked) return { success: false, message: rateLimit.message };

    try {
        const user = await findOrSeedUser(username, password);

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                rateLimits.delete(rateLimit.key!);
                await setSessionCookies(user.id);
                return { success: true };
            }
        }

        const failMessage = recordFailedAttempt(rateLimit.key!, rateLimit.limitData!, rateLimit.now!);
        return { success: false, message: failMessage };

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

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("admin_user_id")?.value;

    if (!userId) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                role: {
                    include: {
                        permissions: true
                    }
                }
            }
        });
        return user;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}
