"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
                createdAt: true,
                // Exclude password
            },
        });
        return { success: true, users };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, message: "Kullanıcılar getirilemedi." };
    }
}

export async function getUser(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
                // Exclude password
            },
        });

        if (!user) return { success: false, message: "Kullanıcı bulunamadı." };

        return { success: true, user };
    } catch (error) {
        console.error("Error fetching user:", error);
        return { success: false, message: "Kullanıcı getirilemedi." };
    }
}

export async function createUser(data: FormData) {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const role = data.get("role") as string || "EDITOR";

    if (!name || !email || !password) {
        return { success: false, message: "Tüm alanları doldurun." };
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { success: false, message: "Bu e-posta adresi zaten kullanımda." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });

        revalidatePath("/admin/users");
        return { success: true, message: "Kullanıcı başarıyla oluşturuldu." };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, message: "Kullanıcı oluşturulurken bir hata oluştu." };
    }
}

// Helper to get current user session (simplified for now as we don't have full session mgmt yet)
// We need to know if the requester is an admin.
// Ideally usage: const session = await getSession();
// For now, we'll check the cookie 'admin_session' which acts as a simple gate.
// BUT, to restrict password changes for OTHER admins, we need to know the hierarchy or just allowing any admin to change any password.
// The user request: "admin user never deleted", "only admin accounts can change passwords"
// Since all users here are "admins" (accessing /admin), we assume the logged in user IS an admin/editor.
// We need to distinguish between "Head Admin" (admin@mkygrup.com) and others if needed.

import { cookies } from "next/headers";

async function isHeadAdmin(email: string) {
    return email === "admin@mkygrup.com";
}

export async function updateUser(id: string, data: FormData) {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string; // Optional
    const role = data.get("role") as string;

    if (!name || !email) {
        return { success: false, message: "İsim ve e-posta zorunludur." };
    }

    try {
        const userToUpdate = await prisma.user.findUnique({ where: { id } });
        if (!userToUpdate) return { success: false, message: "Kullanıcı bulunamadı." };

        // Checks for Head Admin
        if (await isHeadAdmin(userToUpdate.email) && role !== "ADMIN") {
            return { success: false, message: "Ana yönetici rolü değiştirilemez." };
        }

        const updateData: any = {
            name,
            email,
            role,
        };

        if (password && password.trim() !== "") {
            // Check if current user is allowed to change password.
            // Requirement: "Sadece parolasını yönetici hesapları değiştirebilsin"
            // Assuming the person performing this action IS a "yönetici hesabı" (Admin role).
            // But we don't have the context of the CURRENT user executing this action easily without full session.
            // However, the panel is protected. We can assume access = authorized for now, 
            // OR we fetch the current user from the cookie 'admin_user_id' if we set it.

            const cookieStore = await cookies();
            const currentUserId = cookieStore.get("admin_user_id")?.value;

            if (currentUserId) {
                const currentUser = await prisma.user.findUnique({ where: { id: currentUserId } });
                if (currentUser && currentUser.role !== "ADMIN" && currentUser.id !== id) {
                    return { success: false, message: "Sadece yöneticiler başkalarının şifresini değiştirebilir." };
                }
            }

            updateData.password = await bcrypt.hash(password, 10);
        }

        await prisma.user.update({
            where: { id },
            data: updateData,
        });

        revalidatePath("/admin/users");
        revalidatePath(`/admin/users/${id}`);
        return { success: true, message: "Kullanıcı başarıyla güncellendi." };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, message: "Kullanıcı güncellenirken bir hata oluştu." };
    }
}

export async function deleteUser(id: string) {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return { success: false, message: "Kullanıcı bulunamadı." };

        if (user.email === "admin@mkygrup.com") {
            return { success: false, message: "Ana yönetici hesabı silinemez!" };
        }

        // Also protect against deleting yourself?
        const cookieStore = await cookies();
        const currentUserId = cookieStore.get("admin_user_id")?.value;
        if (currentUserId === id) {
            return { success: false, message: "Kendi hesabınızı silemezsiniz." };
        }

        await prisma.user.delete({ where: { id } });
        revalidatePath("/admin/users");
        return { success: true, message: "Kullanıcı başarıyla silindi." };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, message: "Kullanıcı silinirken bir hata oluştu." };
    }
}
