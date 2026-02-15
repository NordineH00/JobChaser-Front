import type { DoctypeMime } from "../interfaces/relation.interface";
import type { DOCTYPE_MIME_Row } from "../interfaces/typesDB.interface";

export function mapDbToDoctypeMime(row: DOCTYPE_MIME_Row): DoctypeMime {
  return {
    doctypeId: row.doctype_id,
    mimeId: row.MIME_id,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export function mapDoctypeMimeToDb(dm: DoctypeMime): DOCTYPE_MIME_Row {
  return {
    doctype_id: dm.doctypeId,
    MIME_id: dm.mimeId,
    created_at: dm.createdAt.toISOString(),
    updated_at: dm.updatedAt.toISOString(),
  };
}