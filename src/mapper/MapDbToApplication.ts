
import type { Application } from "../interfaces/relation.interface";
import type { APPLICATION_Row } from "../interfaces/typesDB.interface";

export function mapDbToApplication(row: APPLICATION_Row): Application {
  return {
    id: row.id,
    jobTitle: row.job_title,
    jobReference: row.job_reference ?? "",
    appStatus: row.app_status as Application["appStatus"],
    phoneNumber: row.phone_number ?? "",
    contact: row.contact ?? "",
    email: row.email ?? "",
    observation: row.observation ?? "",
    userId: row.user_id,
    companyId: row.company_id,
    isFavorite: row.is_favorite,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export function mapApplicationToDb(app: Application): APPLICATION_Row {
  return {
    id: app.id,
    job_title: app.jobTitle,
    job_reference: app.jobReference || null,
    app_status: app.appStatus,
    phone_number: app.phoneNumber || null,
    contact: app.contact || null,
    email: app.email || null,
    observation: app.observation || null,
    user_id: app.userId,
    company_id: app.companyId,
    is_favorite: app.isFavorite,
    created_at: app.createdAt.toISOString(),
    updated_at: app.updatedAt.toISOString(),
  };
}