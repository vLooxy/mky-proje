
import { PageBuilderEditor } from "@/components/admin/page-builder/PageBuilderEditor";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const page = await prisma.page.findUnique({
        where: { id },
        include: { sections: { orderBy: { order: "asc" } } }
    });

    if (!page) notFound();

    return (
        <div className="h-full p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Düzenle: {page.title}</h1>
                <div className="text-sm text-gray-500 font-mono">{page.slug}</div>
            </div>
            <PageBuilderEditor page={page} />
        </div>
    );
}
