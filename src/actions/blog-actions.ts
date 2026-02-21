"use server";

import { revalidatePath } from "next/cache";
import { BlogPost } from "@/types/blog";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/actions/auth-actions";

export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const posts = await prisma.blog.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return posts.map(post => ({
            ...post,
            date: post.publishedAt ? post.publishedAt.toISOString() : post.createdAt.toISOString(),
            readTime: post.readTime,
            publishedAt: post.publishedAt?.toISOString(),
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
            date: post.publishedAt ? post.publishedAt.toISOString() : post.createdAt.toISOString(),
            readTime: post.readTime,
            publishedAt: post.publishedAt?.toISOString(),
        };
    } catch (error) {
        console.error("Error reading blog post:", error);
        return null;
    }
}

export async function updateBlogPost(id: string, newData: Partial<BlogPost>) {
    try {
        const currentUser = await getCurrentUser();
        const isAdmin = currentUser?.role?.name === "Yönetici";

        // date is ignored as we use createdAt/updatedAt from DB

        // Check if we are creating or updating
        // For new posts, id might be empty or a placeholder
        const existingPost = id ? await prisma.blog.findUnique({ where: { id } }) : null;

        if (existingPost) {
            if (existingPost.isPublished !== newData.isPublished && !isAdmin) {
                return { success: false, error: "Sadece yöneticiler blog durumunu (yayınlama/kaldırma) değiştirebilir." };
            }

            try {
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
                        readTime: newData.readTime,
                        publishedAt: newData.publishedAt ? new Date(newData.publishedAt) : (newData.isPublished ? new Date() : null),
                    }
                });
            } catch (updateError) {
                console.error("Prisma update error:", updateError);
                return { success: false, error: `Güncelleme hatası: ${updateError instanceof Error ? updateError.message : String(updateError)}` };
            }
        } else {
            if (newData.isPublished && !isAdmin) {
                return { success: false, error: "Sadece yöneticiler blog yayınlayabilir. Lütfen taslak olarak kaydedin." };
            }

            try {
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
                        readTime: newData.readTime,
                        publishedAt: newData.publishedAt ? new Date(newData.publishedAt) : (newData.isPublished ? new Date() : null),
                    }
                });
            } catch (createError) {
                console.error("Prisma create error:", createError);
                return { success: false, error: `Oluşturma hatası: ${createError instanceof Error ? createError.message : String(createError)}` };
            }
        }

        revalidatePath("/(site)/blog");
        revalidatePath(`/admin/blog`);
        return { success: true };
    } catch (error) {
        console.error("Error updating blog post (general):", error);
        return { success: false, error: `Genel hata: ${error instanceof Error ? error.message : String(error)}` };
    }
}

import { hasPermission } from "@/lib/auth-checks";

export async function deleteBlogPost(id: string) {
    try {
        const canDelete = await hasPermission("delete_records");
        if (!canDelete) {
            return { success: false, error: "Bu işlem için yetkiniz yok (delete_records)." };
        }

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

