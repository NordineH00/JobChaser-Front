// ==============================
// DOCUMENT
// ==============================
export interface Document {
    id: string;
    title: string;
    path: string;
    size?: number | null;
    note?: string | null;
    userId: string;
    doctypeId: string;
    isFavorite: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ==============================
// DOCUMENT TYPE (DocType)
// ==============================
export interface DocType {
    id: string;
    type: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// ==============================
// MIME TYPE
// ==============================
export interface MimeType {
    id: string;
    maxSize: number;
    mimeValue: string;
    fileExtension: string;
    createdAt: Date;
    updatedAt: Date;
}