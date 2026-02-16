"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/pages.json");

export async function getPageData(slug: string) {
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const data = JSON.parse(fileContent);
        return data[slug] || null;
    } catch (error) {
        console.error("Error reading page data:", error);
        return null;
    }
}

export async function getAllPages() {
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(fileContent);
    } catch {
        return {};
    }
}

export async function updatePageData(slug: string, newData: unknown) {
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const data = JSON.parse(fileContent);

        data[slug] = newData;

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");

        revalidatePath("/");
        revalidatePath(`/(site)`);
        revalidatePath(`/admin/pages/${slug}`);

        return { success: true };
    } catch (error) {
        console.error("Error updating page data:", error);
        return { success: false, error: "Failed to update page data" };
    }
}
