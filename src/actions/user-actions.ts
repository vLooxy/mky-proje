"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
// import { User } from "@prisma/client"; // content removed or just omit line
import bcrypt from "bcryptjs";

export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                roleId: true,
                role: { select: { name: true } },
                image: true,
                createdAt: true,
                updatedAt: true,
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
                role: { select: { name: true } },
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
        const roleName = role === "ADMIN" ? "Yönetici" : "Editör";

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: { connect: { name: roleName } },
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

// --- Helpers ---
async function checkHeadAdminUpdateProtection(userEmail: string, newRole: string) {
    if (await isHeadAdmin(userEmail) && newRole !== "ADMIN") {
        return { success: false, message: "Ana yönetici rolü değiştirilemez." };
    }
    return null;
}

async function checkPasswordUpdateAuthorization(targetUserId: string, newPassword?: string) {
    if (!newPassword || newPassword.trim() === "") return null;

    const cookieStore = await cookies();
    const currentUserId = cookieStore.get("admin_user_id")?.value;

    if (currentUserId) {
        const currentUser = await prisma.user.findUnique({
            where: { id: currentUserId },
            include: { role: true }
        });

        if (currentUser && currentUser.role?.name !== "Yönetici" && currentUser.id !== targetUserId) {
            return { success: false, message: "Sadece yöneticiler başkalarının şifresini değiştirebilir." };
        }
    }
    return null;
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

        const headAdminCheck = await checkHeadAdminUpdateProtection(userToUpdate.email, role);
        if (headAdminCheck) return headAdminCheck;

        const passwordCheck = await checkPasswordUpdateAuthorization(id, password);
        if (passwordCheck) return passwordCheck;

        const roleName = role === "ADMIN" ? "Yönetici" : "Editör";
        const updateData: any = { name, email };

        if (password && password.trim() !== "") {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await prisma.user.update({
            where: { id },
            data: {
                ...updateData,
                role: { connect: { name: roleName } }
            },
        });

        revalidatePath("/admin/users");
        revalidatePath(`/admin/users/${id}`);
        return { success: true, message: "Kullanıcı başarıyla güncellendi." };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, message: "Kullanıcı güncellenirken bir hata oluştu." };
    }
}

import { hasPermission } from "@/lib/auth-checks";

export async function deleteUser(id: string) {
    try {
        const canDelete = await hasPermission("delete_records");
        if (!canDelete) {
            return { success: false, message: "Bu işlem için yetkiniz yok (delete_records)." };
        }

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
