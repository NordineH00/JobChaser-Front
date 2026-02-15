import type { RolePermission } from "../interfaces/relation.interface";
import type { ROLE_PERMISSION_Row } from "../interfaces/typesDB.interface";

export function mapDbToRolePermission(row: ROLE_PERMISSION_Row): RolePermission {
    return {
        roleId: row.role_id,
        permissionId: row.permission_id,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function mapRolePermissionToDb(rp: RolePermission): ROLE_PERMISSION_Row {
    return {
        role_id: rp.roleId,
        permission_id: rp.permissionId,
        created_at: rp.createdAt.toISOString(),
        updated_at: rp.updatedAt.toISOString(),
    };
}