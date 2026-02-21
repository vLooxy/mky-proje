// Manually defining types because prisma generate is blocked
export type Permission = {
    id: string;
    slug: string;
    name: string;
    description: string | null;
};

export type Role = {
    id: string;
    name: string;
    description: string | null;
    permissions: Permission[];
    users?: User[];
    _count?: {
        users: number;
        permissions: number;
    };
};

export type User = {
    id: string;
    name: string;
    email: string;
    image: string | null;
    roleId: string | null;
    role: { name: string; permissions?: Permission[] } | null;
    createdAt: Date;
    updatedAt: Date;
};
