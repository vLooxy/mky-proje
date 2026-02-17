"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function getForms() {
    try {
        const forms = await prisma.contactForm.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                subject: true,
                message: true,
                createdAt: true,
                status: true,
                fileName: true,
                // fileData is excluded for performance
            }
        });

        // Convert dates to ISO string for consistency with previous implementation if needed by frontend
        // But better to return the object as is and handle dates in frontend or let serialisation handle it.
        // Prisma dates are Date objects, JSON.stringify handles them fine.
        return { success: true, forms };
    } catch (error) {
        console.error("Error fetching forms:", error);
        return { success: false, forms: [] };
    }
}

export async function submitForm(prevState: unknown, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;
        const file = formData.get("file") as File | null;

        // Simple Validation
        if (!name || !email || !phone || !message) {
            return { success: false, message: "Lütfen gerekli alanları doldurunuz." };
        }

        let fileData: string | undefined;
        let fileName: string | undefined;

        if (file && file.size > 0) {
            const validTypes = [
                "application/pdf",
                "application/zip",
                "application/x-zip-compressed",
                "application/vnd.rar",
                "application/x-rar-compressed",
                "application/x-rar",
                "image/jpeg",
                "image/png"
            ];

            if (!validTypes.includes(file.type)) {
                return { success: false, message: "Desteklenmeyen dosya formatı. (PDF, ZIP, RAR, JPEG, PNG)" };
            }
            if (file.size > 20 * 1024 * 1024) { // 20MB
                return { success: false, message: "Dosya boyutu 20MB'dan küçük olmalıdır." };
            }

            const buffer = Buffer.from(await file.arrayBuffer());
            fileData = `data:${file.type};base64,${buffer.toString("base64")}`;
            fileName = file.name;
        }

        await prisma.contactForm.create({
            data: {
                name,
                email,
                phone,
                subject: subject || "Genel",
                message,
                fileData,
                fileName,
                status: "pending"
            }
        });

        revalidatePath("/admin");

        return { success: true, message: "Form başarıyla gönderildi." };
    } catch (error) {
        console.error("Form submit error:", error);
        return { success: false, message: "Bir hata oluştu." };
    }
}

export async function deleteForm(id: string) {
    try {
        await prisma.contactForm.delete({
            where: { id }
        });

        revalidatePath("/admin");

        return { success: true, message: "Başvuru silindi." };
    } catch (error) {
        console.error("Form delete error:", error);
        return { success: false, message: "Silme işlemi başarısız." };
    }
}

export async function updateFormStatus(id: string, status: string) {
    try {
        await prisma.contactForm.update({
            where: { id },
            data: { status }
        });

        revalidatePath("/admin");

        return { success: true, message: "Durum güncellendi." };
    } catch (error) {
        console.error("Form status update error:", error);
        return { success: false, message: "Durum güncellenemedi." };
    }
}
