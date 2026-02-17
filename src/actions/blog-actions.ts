"use server";

import { revalidatePath } from "next/cache";
import { BlogPost } from "@/types/blog";
import { prisma } from "@/lib/db";

export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const posts = await prisma.blog.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return posts.map(post => ({
            ...post,
            date: post.createdAt.toISOString()
        }));
    } catch (error) {
        console.error("Error reading blog posts:", error);
        return [];
    }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const post = await prisma.blog.findUnique({
            where: { slug }
        });

        if (!post) return null;

        return {
            ...post,
            date: post.createdAt.toISOString()
        };
    } catch (error) {
        console.error("Error reading blog post:", error);
        return null;
    }
}

export async function updateBlogPost(id: string, newData: Partial<BlogPost>) {
    try {
        // date is ignored as we use createdAt/updatedAt from DB

        // Check if we are creating or updating
        // For new posts, id might be empty or a placeholder
        const existingPost = id ? await prisma.blog.findUnique({ where: { id } }) : null;

        if (existingPost) {
            await prisma.blog.update({
                where: { id },
                data: {
                    title: newData.title,
                    slug: newData.slug,
                    excerpt: newData.excerpt,
                    content: newData.content,
                    image: newData.image,
                    author: newData.author,
                    tags: newData.tags,
                    categoryId: newData.categoryId,
                    isPublished: newData.isPublished,
                }
            });
        } else {
            await prisma.blog.create({
                data: {
                    title: newData.title!,
                    slug: newData.slug!,
                    excerpt: newData.excerpt!,
                    content: newData.content!,
                    image: newData.image,
                    author: newData.author,
                    tags: newData.tags || [],
                    categoryId: newData.categoryId,
                    isPublished: newData.isPublished || false,
                }
            });
        }

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
        await prisma.blog.delete({
            where: { id }
        });

        revalidatePath("/(site)/blog");
        revalidatePath(`/admin/blog`);
        return { success: true };
    } catch (error) {
        console.error("Error deleting blog post:", error);
        return { success: false, error: "Failed to delete blog post" };
    }
}

