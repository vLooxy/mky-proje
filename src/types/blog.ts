export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    color: string; // tailwind class e.g. "bg-blue-500"
    count?: number; // optional for display
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image?: string | null;
    date: string;
    author?: string | null;
    tags?: string[];
    isPublished?: boolean;
    categoryId?: string | null;
    readTime?: string | null;
    publishedAt?: string | null;
}
