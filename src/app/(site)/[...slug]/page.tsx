
import { PageRenderer } from "@/components/PageRenderer";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string[] }>
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const slug = (await params).slug.join('/');

    const page = await prisma.page.findUnique({
        where: { slug },
    });

    if (!page) return { title: 'Sayfa Bulunamadı' };

    return {
        title: page.title,
        description: page.description,
    }
}

export default async function DynamicPage({ params }: Props) {
    const { slug: slugArray } = await params;
    const slug = slugArray.join('/');

    const page = await prisma.page.findUnique({
        where: { slug: slug, isPublished: true },
        include: { sections: { orderBy: { order: "asc" } } }
    });

    if (!page) {
        notFound();
    }

    return (
        <main>
            <PageRenderer sections={page.sections} />
        </main>
    );
}
