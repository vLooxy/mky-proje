import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const form = await prisma.contactForm.findUnique({
            where: { id },
            select: {
                fileData: true,
                fileName: true
            }
        });

        if (!form || !form.fileData) {
            return new NextResponse("File not found", { status: 404 });
        }

        // Optimized parsing: use substring to avoid creating intermediate arrays
        const commaIndex = form.fileData.indexOf(',');
        if (commaIndex === -1) {
            return new NextResponse("Invalid file data", { status: 500 });
        }

        const meta = form.fileData.substring(0, commaIndex); // e.g., "data:application/pdf;base64"
        const contentType = meta.split(':')[1]?.split(';')[0] || 'application/pdf';
        const base64Data = form.fileData.substring(commaIndex + 1);

        const buffer = Buffer.from(base64Data, 'base64');

        const filename = form.fileName || 'download.pdf';

        // Encode filename for Content-Disposition header to handle special characters
        const encodedFilename = encodeURIComponent(filename).replace(/['()]/g, escape).replace(/\*/g, '%2A');

        // Create an ASCII-only version for the legacy filename parameter
        // Replace non-ASCII characters with underscores or remove them
        const asciiFilename = filename.replace(/[^\x20-\x7E]/g, '_');

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodedFilename}`,
                'Content-Length': buffer.length.toString(),
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
            },
        });
    } catch (error) {
        console.error("Download error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
