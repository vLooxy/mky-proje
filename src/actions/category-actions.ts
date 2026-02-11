"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { BlogCategory } from "@/types/blog";
import { getBlogPosts } from "./blog-actions";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/categories.json");

export async function getCategories(): Promise<BlogCategory[]> {
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const categories = JSON.parse(fileContent) as BlogCategory[];

        // Calculate counts
        const posts = await getBlogPosts();

        return categories.map(cat => ({
            ...cat,
            count: posts.filter(p => p.categoryId === cat.id).length
        }));
    } catch (error) {
        console.error("Error reading categories:", error);
        // If file doesn't exist, return empty array
        return [];
    }
}

export async function addCategory(category: Omit<BlogCategory, "id">) {
    try {
        // Read raw file to avoid circular dependency if we used getCategories with counts
        let categories: BlogCategory[] = [];
        try {
            const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
            categories = JSON.parse(fileContent);
        } catch {
            // File might not exist yet
        }

        const newCategory: BlogCategory = {
            ...category,
            id: Date.now().toString()
        };

        categories.push(newCategory);
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(categories, null, 2), "utf-8");

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
        const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const categories = JSON.parse(fileContent) as BlogCategory[];

        const index = categories.findIndex(c => c.id === id);
        if (index === -1) return { success: false, error: "Category not found" };

        categories[index] = { ...categories[index], ...data };

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(categories, null, 2), "utf-8");

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
        const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
        let categories = JSON.parse(fileContent) as BlogCategory[];

        categories = categories.filter(c => c.id !== id);

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(categories, null, 2), "utf-8");

        revalidatePath("/admin/blog");
        revalidatePath("/admin/blog/categories");
        return { success: true };
    } catch (error) {
        console.error("Error deleting category:", error);
        return { success: false, error: "Failed to delete category" };
    }
}
