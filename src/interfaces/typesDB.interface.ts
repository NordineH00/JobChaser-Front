// ===== USER =====================================================
export interface USER_Row {
    id: string;
    first_name: string | null;
    last_name: string | null;
    birthday: string | null; // 'YYYY-MM-DD'
    email: string;
    password: string;
    pseudo: string;
    avatar_url: string | null;
    address_id: string | null;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

// ===== ADDRESS ==================================================
export interface ADDRESS_Row {
    id: string;
    street_name: string;
    street_number: string | null;
    zip_code: number;
    city: string;
    country: string | null;
    created_at: string;
    updated_at: string;
}

// ===== COMPANY ==================================================
export interface COMPANY_Row {
    id: string;
    name: string;
    registration_number: number | null;
    comment: string | null;
    user_id: string;
    address_id: string;
    is_favorite: boolean;
    created_at: string;
    updated_at: string;
}

// ===== APPLICATION ==============================================
// Si tu veux verrouiller les statuts côté TS, dé-commente:
// export type ApplicationStatusDB = "en attente" | "clôturée" | "acceptée" | "refusée";

export interface APPLICATION_Row {
    id: string;
    job_title: string;
    job_reference: string | null;
    app_status: string; // ou ApplicationStatusDB
    phone_number: string | null;
    contact: string | null;
    email: string | null;
    observation: string | null;
    user_id: string;
    company_id: string;
    is_favorite: boolean;
    created_at: string;
    updated_at: string;
}

// ===== EVENT ====================================================
export interface EVENT_Row {
    id: string;
    name: string;
    event_type: string | null;
    start_time: string; // 'YYYY-MM-DDTHH:mm:ss'
    duration: number | null;
    event_status: string;
    remark: string | null;
    user_id: string;
    company_id: string | null;
    address_id: string;
    application_id: string | null;
    is_remote: boolean;
    meeting_URL: string | null;
    meeting_software: string | null;
    created_at: string;
    updated_at: string;
}

// ===== DOCUMENT =================================================
export interface DOCUMENT_Row {
    id: string;
    title: string;
    path: string;
    size: number | null;
    note: string | null;
    user_id: string;
    doctype_id: string;
    is_favorite: boolean;
    created_at: string;
    updated_at: string;
}

// ===== DOCUMENT_TYPE (DocType) =================================
export interface DOCUMENT_TYPE_Row {
    id: string;
    type: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

// ===== MIME_TYPE ================================================
export interface MIME_TYPE_Row {
    id: string;
    max_size: number;
    MIME_value: string;
    file_extension: string;
    created_at: string;
    updated_at: string;
}

// ===== ROLE =====================================================
export interface ROLE_Row {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

// ===== PERMISSION ===============================================
export interface PERMISSION_Row {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

// ===== JOINTURES N-N ============================================

export interface USER_ROLE_Row {
    user_id: string;
    role_id: string;
    created_at: string;
    updated_at: string;
}

export interface APPLICATION_DOCUMENT_Row {
    document_id: string;
    application_id: string;
    created_at: string;
    updated_at: string;
}

export interface ROLE_PERMISSION_Row {
    role_id: string;
    permission_id: string;
    created_at: string;
    updated_at: string;
}

export interface DOCTYPE_MIME_Row {
    doctype_id: string;
    MIME_id: string;
    created_at: string;
    updated_at: string;
}

export type SeedRoot = { APPLICATION: APPLICATION_Row[] };