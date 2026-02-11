import { getCategories } from "@/actions/category-actions";
import CategoryForm from "@/components/admin/blog/CategoryForm";

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="p-6 lg:p-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Kategori Yönetimi</h1>
                    <p className="text-slate-500 dark:text-admin-text-muted mt-1 text-sm">Blog yazılarınız için kategorileri yönetin.</p>
                </div>

                <CategoryForm initialCategories={categories} />
            </div>
        </div>
    );
}
