
// ==============================
// USER_ROLE (jointure N-N)
// ==============================
export interface UserRole {
    userId: string;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
}

// ==============================
// APPLICATION_DOCUMENT (jointure N-N)
// ==============================
export interface ApplicationDocument {
    documentId: string;
    applicationId: string;
    createdAt: Date;
    updatedAt: Date;
}

// ==============================
// ROLE_PERMISSION (jointure N-N)
// ==============================
export interface RolePermission {
    roleId: string;
    permissionId: string;
    createdAt: Date;
    updatedAt: Date;
}

// ==============================
// DOCTYPE_MIME (jointure N-N)
// ==============================
export interface DoctypeMime {
    doctypeId: string;
    mimeId: string;
    createdAt: Date;
    updatedAt: Date;
}