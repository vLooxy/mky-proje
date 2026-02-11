import BlogPostForm from "@/components/admin/blog/BlogPostForm";

export default function NewPostPage() {
    return (
        <div className="p-6 lg:p-10">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Yeni Yazı Ekle</h1>
                    <p className="text-slate-500 dark:text-admin-text-muted mt-1 text-sm">Yeni bir blog yazısı oluşturun.</p>
                </div>

                <div className="bg-admin-card dark:bg-admin-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <BlogPostForm />
                </div>
            </div>
        </div>
    );
}
