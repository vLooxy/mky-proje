import { prisma } from "../src/lib/db";

async function main() {
    console.log("Adding 'delete_records' permission...");

    try {
        const permission = await prisma.permission.upsert({
            where: { slug: "delete_records" },
            update: {},
            create: {
                name: "Kayıt Silme",
                slug: "delete_records",
                description: "Veri tabanından kayıt silme yetkisi (Blog, Sayfa, Kullanıcı vb.)"
            }
        });

        console.log("Permission added:", permission);

        // Assign to Admin role by default
        const adminRole = await prisma.role.findUnique({ where: { name: "Yönetici" } });
        if (adminRole) {
            await prisma.role.update({
                where: { id: adminRole.id },
                data: {
                    permissions: {
                        connect: { id: permission.id }
                    }
                }
            });
            console.log("Assigned to Admin role.");
        }

    } catch (e) {
        console.error("Error adding permission:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
