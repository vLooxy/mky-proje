import { getSettings } from "@/actions/settings-actions";
import { requirePermission } from "@/lib/auth-checks";
import { SettingsClient } from "@/components/admin/settings/SettingsClient";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
    await requirePermission("manage_settings");
    const initialSettings = await getSettings();

    return <SettingsClient initialSettings={initialSettings} />;
}
