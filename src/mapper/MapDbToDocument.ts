import type { DOCUMENT_Row } from "../interfaces/typesDB.interface";
import type { Document } from "../interfaces/relation.interface";

export function mapDbToDocument(row: DOCUMENT_Row): Document {
    return {
        id: row.id,
        title: row.title,
        path: row.path,
        size: row.size ?? null,
        note: row.note ?? null,
        userId: row.user_id,
        doctypeId: row.doctype_id,
        isFavorite: row.is_favorite,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function mapDocumentToDb(doc: Document): DOCUMENT_Row {
    return {
        id: doc.id,
        title: doc.title,
        path: doc.path,
        size: doc.size ?? null,
        note: doc.note ?? null,
        user_id: doc.userId,
        doctype_id: doc.doctypeId,
        is_favorite: doc.isFavorite,
        created_at: doc.createdAt.toISOString(),
        updated_at: doc.updatedAt.toISOString(),
    };
}