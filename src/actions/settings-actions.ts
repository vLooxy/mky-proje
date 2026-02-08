"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import defaultSettings from "@/data/settings.json";

const SETTINGS_KEY = "global_settings";

export async function getSettings() {
    try {
        const settings = await prisma.settings.findUnique({
            where: { key: SETTINGS_KEY }
        });

        if (settings) {
            return JSON.parse(settings.value);
        }

        return defaultSettings;
    } catch (error) {
        console.error("Error fetching settings:", error);
        return defaultSettings;
    }
}

export async function updateSettings(newData: typeof defaultSettings) {
    try {
        await prisma.settings.upsert({
            where: { key: SETTINGS_KEY },
            update: { value: JSON.stringify(newData) },
            create: { key: SETTINGS_KEY, value: JSON.stringify(newData) }
        });

        revalidatePath("/", "layout");
        return { success: true };
    } catch (error) {
        console.error("Error updating settings:", error);
        return { success: false, error: "Failed to update settings" };
    }
}
