import type { DocType } from "../interfaces/relation.interface";
import type { DOCUMENT_TYPE_Row } from "../interfaces/typesDB.interface";

export function mapDbToDocType(row: DOCUMENT_TYPE_Row): DocType {
    return {
        id: row.id,
        type: row.type,
        description: row.description ?? null,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function mapDocTypeToDb(dt: DocType): DOCUMENT_TYPE_Row {
    return {
        id: dt.id,
        type: dt.type,
        description: dt.description ?? null,
        created_at: dt.createdAt.toISOString(),
        updated_at: dt.updatedAt.toISOString(),
    };
}