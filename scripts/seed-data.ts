
import { prisma } from "../src/lib/db";
import fs from "fs/promises";
import path from "path";

async function main() {
    const dataDir = path.join(process.cwd(), "src/data");

    // Migrate Categories
    try {
        const categoriesData = await fs.readFile(path.join(dataDir, "categories.json"), "utf-8");
        const categories = JSON.parse(categoriesData);
        for (const cat of categories) {
            await prisma.category.upsert({
                where: { slug: cat.slug },
                update: {
                    name: cat.name,
                    color: cat.color
                },
                create: {
                    id: cat.id, // Keep existing ID if possible, or omit to generate new one. Ideally keep to preserve relations.
                    name: cat.name,
                    slug: cat.slug,
                    color: cat.color
                }
            });
        }
        console.log("Categories migrated.");
    } catch (e: any) {
        console.log("No categories.json found or error:", e.message);
    }

    // Migrate Blogs
    try {
        const blogsData = await fs.readFile(path.join(dataDir, "blogs.json"), "utf-8");
        const blogs = JSON.parse(blogsData);
        for (const blog of blogs) {
            await prisma.blog.upsert({
                where: { slug: blog.slug },
                update: {
                    title: blog.title,
                    excerpt: blog.excerpt,
                    content: blog.content,
                    image: blog.image,
                    author: blog.author,
                    tags: blog.tags,
                    categoryId: blog.categoryId,
                    isPublished: blog.isPublished
                },
                create: {
                    id: blog.id,
                    title: blog.title,
                    slug: blog.slug,
                    excerpt: blog.excerpt,
                    content: blog.content,
                    image: blog.image,
                    author: blog.author,
                    tags: blog.tags,
                    categoryId: blog.categoryId,
                    isPublished: blog.isPublished
                }
            });
        }
        console.log("Blogs migrated.");
    } catch (e: any) {
        console.log("No blogs.json found or error:", e.message);
    }

    // Migrate Pages
    try {
        const pagesData = await fs.readFile(path.join(dataDir, "pages.json"), "utf-8");
        const pages = JSON.parse(pagesData); // Key-value object { slug: data }

        for (const [slug, content] of Object.entries(pages)) {
            const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
            const jsonContent = JSON.stringify(content);

            await prisma.page.upsert({
                where: { slug },
                update: { contentJson: jsonContent },
                create: {
                    slug,
                    title,
                    contentJson: jsonContent,
                    isPublished: true
                }
            });
        }
        console.log("Pages migrated.");
    } catch (e: any) {
        console.log("No pages.json found or error:", e.message);
    }

    // Migrate Settings
    try {
        const settingsData = await fs.readFile(path.join(dataDir, "settings.json"), "utf-8");
        const settings = JSON.parse(settingsData); // Key-value

        for (const [key, value] of Object.entries(settings)) {
            // Value might be object or string, convert to string for DB
            const strValue = typeof value === 'string' ? value : JSON.stringify(value);

            await prisma.settings.upsert({
                where: { key },
                update: { value: strValue },
                create: {
                    key,
                    value: strValue
                }
            });
        }
        console.log("Settings migrated.");
    } catch (e: any) {
        console.log("No settings.json found or error:", e.message);
    }

    // Migrate Analytics
    try {
        const analyticsData = await fs.readFile(path.join(dataDir, "analytics.json"), "utf-8");
        const analytics = JSON.parse(analyticsData);

        if (analytics.totalVisits) {
            await prisma.analytics.create({
                data: {
                    totalVisits: analytics.totalVisits
                }
            });
        }
        console.log("Analytics migrated.");
    } catch (e: any) {
        console.log("No analytics.json found or error:", e.message);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
