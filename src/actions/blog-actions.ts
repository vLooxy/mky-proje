"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { BlogPost } from "@/types/blog";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/blogs.json");

export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(fileContent) as BlogPost[];
    } catch (error) {
        console.error("Error reading blog posts:", error);
        return [];
    }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const posts = await getBlogPosts();
        return posts.find((p) => p.slug === slug) || null;
    } catch (error) {
        console.error("Error reading blog post:", error);
        return null;
    }
}

export async function updateBlogPost(id: string, newData: Partial<BlogPost>) {
    try {
        const posts = await getBlogPosts();
        const index = posts.findIndex((p) => p.id === id);

        if (index === -1) {
            // Create new
            const newPost: BlogPost = {
                ...newData as BlogPost, // user must provide required fields for new post
                id: Date.now().toString()
            };
            posts.push(newPost);
        } else {
            // Update existing
            posts[index] = { ...posts[index], ...newData };
        }

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(posts, null, 2), "utf-8");

        revalidatePath("/(site)/blog");
        revalidatePath(`/admin/blog`);
        return { success: true };
    } catch (error) {
        console.error("Error updating blog post:", error);
        return { success: false, error: "Failed to update blog post" };
    }
}

export async function deleteBlogPost(id: string) {
    try {
        const posts = await getBlogPosts();
        const filteredPosts = posts.filter((p) => p.id !== id);

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(filteredPosts, null, 2), "utf-8");

        revalidatePath("/(site)/blog");
        revalidatePath(`/admin/blog`);
        return { success: true };
    } catch (error) {
        console.error("Error deleting blog post:", error);
        return { success: false, error: "Failed to delete blog post" };
    }
}

