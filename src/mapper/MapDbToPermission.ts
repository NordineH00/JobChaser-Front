import type { Permission } from "../interfaces/relation.interface";
import type { PERMISSION_Row } from "../interfaces/typesDB.interface";

export function mapDbToPermission(row: PERMISSION_Row): Permission {
    return {
        id: row.id,
        name: row.name,
        description: row.description ?? null,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function mapPermissionToDb(p: Permission): PERMISSION_Row {
    return {
        id: p.id,
        name: p.name,
        description: p.description ?? null,
        created_at: p.createdAt.toISOString(),
        updated_at: p.updatedAt.toISOString(),
    };
}