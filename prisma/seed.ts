import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // 1. Create Permissions
    const permissions = [
        { slug: "view_dashboard", name: "Panel Görüntüleme", description: "Admin paneline giriş yapabilir." },
        { slug: "manage_pages", name: "Sayfa Yönetimi", description: "Sayfaları oluşturabilir, düzenleyebilir ve silebilir." },
        { slug: "manage_blog", name: "Blog Yönetimi", description: "Blog yazılarını yönetebilir." },
        { slug: "manage_media", name: "Medya Yönetimi", description: "Dosya ve görselleri yönetebilir." },
        { slug: "manage_users", name: "Kullanıcı Yönetimi", description: "Kullanıcıları yönetebilir." },
        { slug: "manage_roles", name: "Rol Yönetimi", description: "Rolleri ve izinleri yönetebilir." },
        { slug: "manage_settings", name: "Ayarlar", description: "Sistem ayarlarını değiştirebilir." },
    ];

    console.log("Seeding permissions...");
    for (const perm of permissions) {
        await prisma.permission.upsert({
            where: { slug: perm.slug },
            update: { name: perm.name, description: perm.description },
            create: perm,
        });
    }

    // 2. Create Roles
    console.log("Seeding roles...");

    // Admin Role - All Permissions
    const allPermissions = await prisma.permission.findMany();
    const adminRole = await prisma.role.upsert({
        where: { name: "Yönetici" },
        update: {
            permissions: {
                set: [], // Clear existing to re-add all
                connect: allPermissions.map(p => ({ id: p.id }))
            }
        },
        create: {
            name: "Yönetici",
            description: "Tam yetkili yönetici rolü.",
            permissions: {
                connect: allPermissions.map(p => ({ id: p.id }))
            }
        }
    });

    // Editor Role - Limited Permissions
    const editorPermissions = await prisma.permission.findMany({
        where: {
            slug: {
                in: ["view_dashboard", "manage_pages", "manage_blog", "manage_media"]
            }
        }
    });

    await prisma.role.upsert({
        where: { name: "Editör" },
        update: {
            permissions: {
                set: [],
                connect: editorPermissions.map(p => ({ id: p.id }))
            }
        },
        create: {
            name: "Editör",
            description: "İçerik yöneticisi rolü.",
            permissions: {
                connect: editorPermissions.map(p => ({ id: p.id }))
            }
        }
    });

    // 3. Create Admin User
    const adminEmail = "admin@mkygrup.com";
    const password = process.env.ADMIN_PASS || "admin123";
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Seeding admin user...");
    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            role: { connect: { id: adminRole.id } }
        },
        create: {
            name: "Yönetici Mod",
            email: adminEmail,
            password: hashedPassword,
            role: { connect: { id: adminRole.id } }
        }
    });

    console.log("Seeding completed.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
