"use server";

import { revalidatePath } from "next/cache";
import { BlogCategory } from "@/types/blog";
import { prisma } from "@/lib/db";

export async function getCategories(): Promise<BlogCategory[]> {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { blogs: true }
                }
            }
        });

        return categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            color: cat.color,
            count: cat._count.blogs
        }));
    } catch (error) {
        console.error("Error reading categories:", error);
        return [];
    }
}

export async function addCategory(category: Omit<BlogCategory, "id">) {
    try {
        await prisma.category.create({
            data: {
                name: category.name,
                slug: category.slug, // Ensure slug is unique in UI or handle error
                color: category.color,
            }
        });

        revalidatePath("/admin/blog");
        revalidatePath("/admin/blog/categories");
        return { success: true };
    } catch (error) {
        console.error("Error adding category:", error);
        return { success: false, error: "Failed to add category" };
    }
}

export async function updateCategory(id: string, data: Partial<BlogCategory>) {
    try {
        await prisma.category.update({
            where: { id },
            data: {
                name: data.name,
                slug: data.slug,
                color: data.color
            }
        });

        revalidatePath("/admin/blog");
        revalidatePath("/admin/blog/categories");
        return { success: true };
    } catch (error) {
        console.error("Error updating category:", error);
        return { success: false, error: "Failed to update category" };
    }
}

export async function deleteCategory(id: string) {
    try {
        await prisma.category.delete({
            where: { id }
        });

        revalidatePath("/admin/blog");
        revalidatePath("/admin/blog/categories");
        return { success: true };
    } catch (error) {
        console.error("Error deleting category:", error);
        return { success: false, error: "Failed to delete category" };
    }
}
