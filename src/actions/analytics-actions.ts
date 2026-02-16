"use server";

import { prisma } from "@/lib/db";

export async function getAnalytics() {
    try {
        const analytics = await prisma.analytics.findFirst({
            orderBy: { updatedAt: 'desc' }
        });

        if (!analytics) return { totalVisits: 0 };

        return { totalVisits: analytics.totalVisits };
    } catch {
        return { totalVisits: 0 };
    }
}

export async function incrementVisit() {
    try {
        const analytics = await prisma.analytics.findFirst({
            orderBy: { updatedAt: 'desc' }
        });

        if (analytics) {
            const updated = await prisma.analytics.update({
                where: { id: analytics.id },
                data: { totalVisits: analytics.totalVisits + 1 }
            });
            return updated.totalVisits;
        } else {
            const created = await prisma.analytics.create({
                data: { totalVisits: 1 }
            });
            return created.totalVisits;
        }
    } catch (error) {
        console.error("Error incrementing visit:", error);
        return 0;
    }
}
