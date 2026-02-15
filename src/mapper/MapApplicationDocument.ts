
import type { ApplicationDocument } from "../interfaces/relation.interface";
import type { APPLICATION_DOCUMENT_Row } from "../interfaces/typesDB.interface";

export function mapDbToApplicationDocument(row: APPLICATION_DOCUMENT_Row): ApplicationDocument {
    return {
        documentId: row.document_id,
        applicationId: row.application_id,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function mapApplicationDocumentToDb(ad: ApplicationDocument): APPLICATION_DOCUMENT_Row {
    return {
        document_id: ad.documentId,
        application_id: ad.applicationId,
        created_at: ad.createdAt.toISOString(),
        updated_at: ad.updatedAt.toISOString(),
    };
}