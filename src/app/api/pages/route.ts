
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const pages = await prisma.page.findMany({
            orderBy: { updatedAt: "desc" },
        });
        return NextResponse.json(pages);
    } catch {
        return NextResponse.json({ error: "Error fetching pages" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, slug, description } = body;

        const page = await prisma.page.create({
            data: {
                title,
                slug,
                description,
            },
        });

        return NextResponse.json(page);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error creating page" }, { status: 500 });
    }
}
