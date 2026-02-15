import type { Address } from "../interfaces/relation.interface";
import type { ADDRESS_Row } from "../interfaces/typesDB.interface";


export function mapDbToAddress(row: ADDRESS_Row): Address {
    return {
        id: row.id,
        streetName: row.street_name,
        streetNumber: row.street_number ?? null,
        zipCode: row.zip_code,
        city: row.city,
        country: row.country ?? null,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function mapAddressToDb(addr: Address): ADDRESS_Row {
    return {
        id: addr.id,
        street_name: addr.streetName,
        street_number: addr.streetNumber ?? null,
        zip_code: addr.zipCode,
        city: addr.city,
        country: addr.country ?? null,
        created_at: addr.createdAt.toISOString(),
        updated_at: addr.updatedAt.toISOString(),
    };
}