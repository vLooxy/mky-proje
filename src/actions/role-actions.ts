"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getRoles() {
    try {
        const roles = await prisma.role.findMany({
            include: {
                permissions: true,
                _count: {
                    select: { users: true, permissions: true }
                }
            },
            orderBy: { name: "asc" }
        });
        return { success: true, roles };
    } catch (error) {
        console.error("Error fetching roles:", error);
        return { success: false, message: "Roller getirilemedi." };
    }
}

export async function getRole(id: string) {
    try {
        const role = await prisma.role.findUnique({
            where: { id },
            include: { permissions: true }
        });
        if (!role) return { success: false, message: "Rol bulunamadı." };
        return { success: true, role };
    } catch (error) {
        console.error("Error fetching role:", error);
        return { success: false, message: "Rol getirilemedi." };
    }
}

export async function getPermissions() {
    try {
        const permissions = await prisma.permission.findMany({
            orderBy: { name: "asc" }
        });
        return { success: true, permissions };
    } catch (error) {
        console.error("Error fetching permissions:", error);
        return { success: false, message: "İzinler getirilemedi." };
    }
}

export async function createRole(data: FormData) {
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const permissionIds = data.getAll("permissions") as string[];

    if (!name) return { success: false, message: "Rol adı zorunludur." };

    try {
        // Check uniqueness
        const existing = await prisma.role.findUnique({ where: { name } });
        if (existing) return { success: false, message: "Bu isimde bir rol zaten var." };

        await prisma.role.create({
            data: {
                name,
                description,
                permissions: {
                    connect: permissionIds.map(id => ({ id }))
                }
            }
        });

        revalidatePath("/admin/roles");
        return { success: true, message: "Rol başarıyla oluşturuldu." };
    } catch (error) {
        console.error("Error creating role:", error);
        return { success: false, message: "Rol oluşturulurken hata oluştu." };
    }
}

export async function updateRole(id: string, data: FormData) {
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const permissionIds = data.getAll("permissions") as string[];

    if (!name) return { success: false, message: "Rol adı zorunludur." };

    try {
        const existing = await prisma.role.findUnique({ where: { id } });
        if (!existing) return { success: false, message: "Rol bulunamadı." };

        // Protect Admin role name change effectively
        if (existing.name === "Yönetici" && name !== "Yönetici") {
            return { success: false, message: "Yönetici rolünün adı değiştirilemez." };
        }

        await prisma.role.update({
            where: { id },
            data: {
                name,
                description,
                permissions: {
                    set: [], // Disconnect all
                    connect: permissionIds.map(id => ({ id }))
                }
            }
        });

        revalidatePath("/admin/roles");
        return { success: true, message: "Rol güncellendi." };
    } catch (error) {
        console.error("Error updating role:", error);
        return { success: false, message: "Rol güncellenirken hata oluştu." };
    }
}

import { hasPermission } from "@/lib/auth-checks";

export async function deleteRole(id: string) {
    try {
        const canDelete = await hasPermission("delete_records");
        if (!canDelete) {
            return { success: false, message: "Bu işlem için yetkiniz yok (delete_records)." };
        }

        const role = await prisma.role.findUnique({
            where: { id },
            include: { _count: { select: { users: true } } }
        });

        if (!role) return { success: false, message: "Rol bulunamadı." };
        if (role.name === "Yönetici" || role.name === "Editör") {
            return { success: false, message: "Bu temel roller silinemez." };
        }
        if (role._count.users > 0) {
            return { success: false, message: "Bu role atanmış kullanıcılar var. Önce kullanıcıların rolünü değiştirin." };
        }

        await prisma.role.delete({ where: { id } });
        revalidatePath("/admin/roles");
        return { success: true, message: "Rol silindi." };
    } catch (error) {
        console.error("Error deleting role:", error);
        return { success: false, message: "Rol silinirken hata oluştu." };
    }
}
