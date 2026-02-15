import type { UserRole } from "../interfaces/relation.interface";
import type { USER_ROLE_Row } from "../interfaces/typesDB.interface";

export function mapDbToUserRole(row: USER_ROLE_Row): UserRole {
    return {
        userId: row.user_id,
        roleId: row.role_id,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function mapUserRoleToDb(ur: UserRole): USER_ROLE_Row {
    return {
        user_id: ur.userId,
        role_id: ur.roleId,
        created_at: ur.createdAt.toISOString(),
        updated_at: ur.updatedAt.toISOString(),
    };
}