"use client";

import { deleteBlogPost } from "@/actions/blog-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BlogActionButtonsProps {
    postId: string;
    canDelete: boolean;
}

export function BlogActionButtons({ postId, canDelete }: BlogActionButtonsProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (confirm("Bu yazıyı silmek istediğinizden emin misiniz?")) {
            setIsDeleting(true);
            try {
                await deleteBlogPost(postId);
                router.refresh();
            } catch (error) {
                console.error("Failed to delete post:", error);
                alert("Silme işlemi başarısız oldu.");
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <Link
                href={`/admin/blog/${postId}`}
                className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors"
                title="Düzenle"
            >
                <span className="material-symbols-outlined text-[20px]">edit</span>
            </Link>

            {canDelete && (
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-md transition-colors disabled:opacity-50"
                    title="Sil"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        {isDeleting ? "pending" : "delete"}
                    </span>
                </button>
            )}
        </div>
    );
}
