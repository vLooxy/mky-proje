import { Prisma } from "@prisma/client";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const page = await prisma.page.findUnique({
            where: { id },
            include: {
                sections: {
                    orderBy: { order: "asc" },
                },
            },
        });

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch {
        return NextResponse.json({ error: "Error fetching page" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, slug, description, isPublished, sections } = body;

        // Transaction kullanarak sayfayı ve bölümleri güncelleyelim
        const updatedPage = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            // Sayfa bilgilerini güncelle
            const page = await tx.page.update({
                where: { id },
                data: {
                    title,
                    slug,
                    description,
                    isPublished,
                },
            });

            // Mevcut bölümleri sil (daha temiz bir yöntem varsa onu kullanabiliriz ama bu basit)
            // veya update/create mantığı kurabiliriz.
            // Şimdilik en temizi: Hepsini silip yenilerini oluşturmak.
            // Ancak ID'leri korumak istersek upsert kullanmalıyız.
            // Basitlik için deleteMany + createMany yapıyorum, ama ID değişimi sorun yaratabilir mi?
            // UI tarafında key olarak ID kullanıyorsak sorun olabilir. Client'dan ID geliyorsa korumalıyız.

            // Daha iyi yöntem:
            // Client'dan gelen section'ların ID'si varsa update, yoksa create.
            // ID'si olup client'ta olmayanları sil.

            if (sections) {
                // 1. Mevcut section ID'lerini al
                const currentSections = await tx.section.findMany({
                    where: { pageId: id },
                    select: { id: true },
                });
                const currentIds = currentSections.map((s) => s.id);

                // 2. Client'dan gelen ID'leri al
                const incomingIds = sections.map((s: { id: string }) => s.id).filter((id: string) => id);

                // 3. Silinecek ID'leri bul
                const idsToDelete = currentIds.filter((cid) => !incomingIds.includes(cid));
                if (idsToDelete.length > 0) {
                    await tx.section.deleteMany({
                        where: { id: { in: idsToDelete } }
                    });
                }

                // 4. Upsert işlemleri (Create or Update)
                for (let i = 0; i < sections.length; i++) {
                    const section = sections[i];
                    if (section.id && currentIds.includes(section.id)) {
                        await tx.section.update({
                            where: { id: section.id },
                            data: {
                                type: section.type,
                                content: typeof section.content === 'string' ? section.content : JSON.stringify(section.content),
                                order: i
                            }
                        });
                    } else {
                        await tx.section.create({
                            data: {
                                pageId: id,
                                type: section.type,
                                content: typeof section.content === 'string' ? section.content : JSON.stringify(section.content),
                                order: i
                            }
                        });
                    }
                }
            }

            return page;
        });

        return NextResponse.json(updatedPage);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error updating page" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.page.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Error deleting page" }, { status: 500 });
    }
}
