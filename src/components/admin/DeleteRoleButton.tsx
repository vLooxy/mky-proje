"use client";

import { useTransition } from "react";
import { deleteRole } from "@/actions/role-actions";

interface DeleteRoleButtonProps {
    id: string;
    isSystem: boolean;
    userCount: number;
}

export function DeleteRoleButton({ id, isSystem, userCount }: DeleteRoleButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (isSystem) return;
        if (userCount > 0) {
            alert("Bu role atanmış kullanıcılar olduğu için silinemez.");
            return;
        }

        if (confirm("Bu rolü silmek istediğinize emin misiniz?")) {
            startTransition(async () => {
                const res = await deleteRole(id);
                if (!res.success) {
                    alert(res.message);
                }
            });
        }
    };

    if (isSystem) return null; // Or render disabled button

    return (
        <button
            onClick={handleDelete}
            disabled={isPending || userCount > 0}
            className="text-slate-400 hover:text-red-500 transition-colors p-1 disabled:opacity-30 disabled:cursor-not-allowed"
            title={userCount > 0 ? "Kullanıcısı olan rol silinemez" : "Rolü Sil"}
        >
            <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
    );
}
