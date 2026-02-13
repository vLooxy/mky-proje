import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const adminEmail = "admin@mkygrup.com";
    const password = process.env.ADMIN_PASS || "admin123";

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name: "Yönetici Mod",
                email: adminEmail,
                password: hashedPassword,
                role: "ADMIN",
            },
        });
        console.log("Admin user created.");
    } else {
        console.log("Admin user already exists.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
