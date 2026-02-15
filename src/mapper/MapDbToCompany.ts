
import type { Company } from "../interfaces/relation.interface";
import type { COMPANY_Row } from "../interfaces/typesDB.interface";


export function mapDbToCompany(row: COMPANY_Row): Company {
    return {
        id: row.id,
        name: row.name,
        registrationNumber: row.registration_number ?? null,
        comment: row.comment ?? "",
        userId: row.user_id,
        addressId: row.address_id,
        isFavorite: row.is_favorite,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function mapCompanyToDb(company: Company): COMPANY_Row {
    return {
        id: company.id,
        name: company.name,
        registration_number: company.registrationNumber || null,
        comment: company.comment || null,
        user_id: company.userId,
        address_id: company.addressId,
        is_favorite: company.isFavorite,
        created_at: company.createdAt.toISOString(),
        updated_at: company.updatedAt.toISOString(),
    };
}