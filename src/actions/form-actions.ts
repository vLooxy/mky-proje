"use server";

import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/forms.json");

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export async function getForms() {
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(fileContent);
    } catch {
        // If file doesn't exist, return empty array
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

        const newForm = {
            id: randomUUID(),
            name,
            company: email, // Using email as company/contact info for now or we could add company field to form
            service: subject,
            message, // Storing message too
            date: new Date().toISOString(),
            status: "pending"
        };

        const existingForms = await getForms();
        const updatedForms = [newForm, ...existingForms];

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedForms, null, 2), "utf-8");

        revalidatePath("/admin");

        return { success: true, message: "Form başarıyla gönderildi." };
    } catch (error) {
        console.error("Form submit error:", error);
        return { success: false, message: "Bir hata oluştu." };
    }
}

export async function deleteForm(id: string) {
    try {
        const existingForms = await getForms();
        const updatedForms = existingForms.filter((f: any) => f.id !== id); // eslint-disable-line @typescript-eslint/no-explicit-any

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedForms, null, 2), "utf-8");

        revalidatePath("/admin");

        return { success: true, message: "Başvuru silindi." };
    } catch (error) {
        console.error("Form delete error:", error);
        return { success: false, message: "Silme işlemi başarısız." };
    }
}

export async function updateFormStatus(id: string, status: string) {
    try {
        const existingForms = await getForms();
        const updatedForms = existingForms.map((f: any) => // eslint-disable-line @typescript-eslint/no-explicit-any
            f.id === id ? { ...f, status } : f
        );

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedForms, null, 2), "utf-8");

        revalidatePath("/admin");

        return { success: true, message: "Durum güncellendi." };
    } catch (error) {
        console.error("Form status update error:", error);
        return { success: false, message: "Durum güncellenemedi." };
    }
}
