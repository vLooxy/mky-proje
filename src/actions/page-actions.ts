"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function getPageData(slug: string) {
    try {
        const page = await prisma.page.findUnique({
            where: { slug }
        });

        if (!page?.contentJson) return null;

        return JSON.parse(page.contentJson);
    } catch (error) {
        console.error("Error reading page data:", error);
        return null;
    }
}

export async function getAllPages() {
    try {
        const pages = await prisma.page.findMany();

        // Map to expected format: { [slug]: data }
        const result: Record<string, any> = {};

        pages.forEach(page => {
            if (page.contentJson) {
                try {
                    result[page.slug] = JSON.parse(page.contentJson);
                } catch {
                    // Ignore invalid JSON
                }
            }
        });

        return result;
    } catch {
        return {};
    }
}

export async function updatePageData(slug: string, newData: unknown) {
    try {
        const jsonContent = JSON.stringify(newData);

        // Check if page exists to determine title (fallback)
        // Ideally the UI should provide title
        const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

        await prisma.page.upsert({
            where: { slug },
            update: {
                contentJson: jsonContent,
                updatedAt: new Date()
            },
            create: {
                slug,
                title, // Fallback title
                contentJson: jsonContent,
                isPublished: true // Default to published for pages created this way
            }
        });

        revalidatePath("/");
        revalidatePath(`/(site)`);
        revalidatePath(`/admin/pages/${slug}`);

        return { success: true };
    } catch (error) {
        console.error("Error updating page data:", error);
        return { success: false, error: "Failed to update page data" };
    }
}
