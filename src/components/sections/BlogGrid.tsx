
import { getBlogPosts } from "@/actions/blog-actions";
import { getCategories } from "@/actions/category-actions";
import { BlogList } from "@/components/sections/BlogList";

interface BlogGridProps {
    title?: string;
    itemsPerPage?: number;
    showSearch?: boolean;
}

export async function BlogGrid({ title, itemsPerPage = 6, showSearch = true }: BlogGridProps) {
    const posts = await getBlogPosts();
    const categories = await getCategories();

    return (
        <BlogList
            initialPosts={posts}
            categories={categories}
            title={title}
            itemsPerPage={itemsPerPage}
            showSearch={showSearch}
        />
    );
}
