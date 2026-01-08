export type UserInfoType = {
    id: number | null;
    username: string;
    isAdmin: boolean;
    isActive: boolean;
    roles: string[];
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
}
