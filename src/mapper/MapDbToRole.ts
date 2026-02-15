import type { Role } from "../interfaces/relation.interface";
import type { ROLE_Row } from "../interfaces/typesDB.interface";

export function mapDbToRole(row: ROLE_Row): Role {
    return {
        id: row.id,
        name: row.name,
        description: row.description ?? null,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function mapRoleToDb(role: Role): ROLE_Row {
    return {
        id: role.id,
        name: role.name,
        description: role.description ?? null,
        created_at: role.createdAt.toISOString(),
        updated_at: role.updatedAt.toISOString(),
    };
}