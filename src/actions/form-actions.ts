"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function getForms() {
    try {
        const forms = await prisma.contactForm.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Convert dates to ISO string for consistency with previous implementation if needed by frontend
        // But better to return the object as is and handle dates in frontend or let serialisation handle it.
        // Prisma dates are Date objects, JSON.stringify handles them fine.
        return forms;
    } catch (error) {
        console.error("Error fetching forms:", error);
        return [];
    }
}

export async function submitForm(prevState: unknown, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        // Simple Validation
        if (!name || !email || !message) {
            return { success: false, message: "Lütfen gerekli alanları doldurunuz." };
        }

        await prisma.contactForm.create({
            data: {
                name,
                email,
                subject: subject || "Genel",
                message,
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
