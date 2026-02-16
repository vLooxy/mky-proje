

import { getBlogPosts } from "@/actions/blog-actions";
import { getCategories } from "@/actions/category-actions";
import { BlogList } from "@/components/sections/BlogList";

interface BlogContentProps {
    itemsPerPage?: number;
    showSearch?: boolean;
}

export async function BlogContent({ itemsPerPage = 6, showSearch = true }: BlogContentProps) {
    const posts = await getBlogPosts();
    const categories = await getCategories();

    return (
        <BlogList
            initialPosts={posts}
            categories={categories}
            itemsPerPage={itemsPerPage}
            showSearch={showSearch}
        />
    );
}
