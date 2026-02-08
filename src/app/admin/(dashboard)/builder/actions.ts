
'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPage(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;

    const newPage = await prisma.page.create({
        data: {
            title,
            slug,
            description,
            isPublished: false
        }
    });

    revalidatePath("/admin/builder");
    // Yeni oluşturulan sayfanın editörüne yönlendir
    redirect(`/admin/builder/${newPage.id}`);
}

export async function deletePage(id: string) {
    await prisma.page.delete({ where: { id } });
    revalidatePath("/admin/builder");
}

export async function updatePageStatus(id: string, isPublished: boolean) {
    await prisma.page.update({
        where: { id },
        data: { isPublished }
    });
    revalidatePath("/admin/builder");
    revalidatePath(`/admin/builder/${id}`);
}

export async function savePageContent(id: string, data: {
    title: string,
    slug: string,
    description?: string,
    sections: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
    const { title, slug, description, sections } = data;

    await prisma.$transaction(async (tx) => {
        // 1. Sayfa meta verilerini güncelle
        await tx.page.update({
            where: { id },
            data: { title, slug, description }
        });

        // 2. Section güncelleme mantığı
        // Basitlik için: Tüm sectionları silip temizden oluştur (Order integrity için)
        // Production'da ID korumak daha iyi olabilir ama MVP için bu yeterli ve güvenli (conflict olmaz)
        await tx.section.deleteMany({
            where: { pageId: id }
        });

        if (sections && sections.length > 0) {
            await tx.section.createMany({
                data: sections.map((s, index) => ({
                    pageId: id,
                    type: s.type,
                    content: typeof s.content === 'string' ? s.content : JSON.stringify(s.content),
                    order: index
                }))
            });
        }
    });

    revalidatePath("/admin/builder");
    revalidatePath(`/admin/builder/${id}`);
    return { success: true };
}
