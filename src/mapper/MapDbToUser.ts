import type { USER_Row } from "../interfaces/typesDB.interface";
import type { User } from "../interfaces/relation.interface";

export function mapDbToUser(row: USER_Row): User {
    return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        birthday: row.birthday ? new Date(row.birthday) : null, // 'YYYY-MM-DD'
        email: row.email,
        password: row.password,
        pseudo: row.pseudo,
        avatarUrl: row.avatar_url,
        addressId: row.address_id,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function mapUserToDb(user: User): USER_Row {
    return {
        id: user.id,
        first_name: user.firstName ?? null,
        last_name: user.lastName ?? null,
        birthday: user.birthday ? user.birthday.toISOString().slice(0, 10) : null, // 'YYYY-MM-DD'
        email: user.email,
        password: user.password,
        pseudo: user.pseudo,
        avatar_url: user.avatarUrl ?? null,
        address_id: user.addressId ?? null,
        created_at: user.createdAt.toISOString(),
        updated_at: user.updatedAt.toISOString(),
    };
}