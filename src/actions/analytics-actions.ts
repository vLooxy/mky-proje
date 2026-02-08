"use server";

import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/analytics.json");

export async function getAnalytics() {
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(fileContent);
    } catch {
        return { totalVisits: 0 };
    }
}

export async function incrementVisit() {
    try {
        // Read current
        let data = { totalVisits: 0, lastUpdated: "" };
        try {
            const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
            data = JSON.parse(fileContent);
        } catch { }

        // Increment
        data.totalVisits += 1;
        data.lastUpdated = new Date().toISOString();

        // Write back
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");

        return data.totalVisits;
    } catch (error) {
        console.error("Error incrementing visit:", error);
        return 0;
    }
}
