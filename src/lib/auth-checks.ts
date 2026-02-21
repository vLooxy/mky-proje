import { getCurrentUser } from "@/actions/auth-actions";
import { redirect } from "next/navigation";

export async function requirePermission(permissionSlug: string) {
    const user = await getCurrentUser();

    if (!user || !user.role) {
        redirect("/admin/login");
    }

    if (user.role.name === "Yönetici") return user;

    const hasPermission = user.role.permissions.some((p: { slug: string }) => p.slug === permissionSlug);
    if (!hasPermission) {
        // Redirect to dashboard if authorized but no permission for specific page
        redirect("/admin");
    }

    return user;
}

export async function hasPermission(permissionSlug: string): Promise<boolean> {
    const user = await getCurrentUser();

    if (!user || !user.role) return false;
    if (user.role.name === "Yönetici") return true;

    return user.role.permissions.some((p: { slug: string }) => p.slug === permissionSlug);
}
