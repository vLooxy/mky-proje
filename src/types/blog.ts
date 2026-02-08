export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image?: string;
    date: string;
    author?: string;
    tags?: string[];
    isPublished?: boolean;
}
