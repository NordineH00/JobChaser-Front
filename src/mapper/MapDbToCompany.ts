
import type { Company } from "../interfaces/companies.interface";
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
    } as Company;
}

export function mapCompanyToDb(company: Company): COMPANY_Row {
    return {
        id: company.id,
        name: company.name,
        registration_number: company.registrationNumber ?? null,
        comment: company.comment || null,
        // company may not have a typed 'userId' property on Company interface
        // cast to any to avoid TS error and preserve runtime behavior
        user_id: (company as any).userId,
        address_id: company.addressId,
        is_favorite: company.isFavorite,
        created_at: company.createdAt.toISOString(),
        updated_at: company.updatedAt.toISOString(),
    };
}