// ==============================
// USER
// ==============================
export interface User {
    id: string;
    firstName: string | null;
    lastName: string | null;
    birthday: Date | null;
    email: string;
    password: string;
    pseudo: string;
    avatarUrl?: string | null;
    addressId?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// ==============================
// ROLE
// ==============================
export interface Role {
    id: string;
    name: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// ==============================
// PERMISSION
// ==============================
export interface Permission {
    id: string;
    name: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
}