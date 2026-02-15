import type { MimeType } from "../interfaces/relation.interface";
import type { MIME_TYPE_Row } from "../interfaces/typesDB.interface";

export function mapDbToMimeType(row: MIME_TYPE_Row): MimeType {
    return {
        id: row.id,
        maxSize: row.max_size,
        mimeValue: row.MIME_value,
        fileExtension: row.file_extension,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function mapMimeTypeToDb(m: MimeType): MIME_TYPE_Row {
    return {
        id: m.id,
        max_size: m.maxSize,
        MIME_value: m.mimeValue,
        file_extension: m.fileExtension,
        created_at: m.createdAt.toISOString(),
        updated_at: m.updatedAt.toISOString(),
    };
}