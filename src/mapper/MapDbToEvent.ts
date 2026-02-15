import type { Event } from "../interfaces/relation.interface";
import type { EVENT_Row } from "../interfaces/typesDB.interface";

export function mapDbToEvent(row: EVENT_Row): Event {
  return {
    id: row.id,
    name: row.name,
    eventType: row.event_type ?? "",
    startTime: new Date(row.start_time),
    duration: row.duration ?? null,
    eventStatus: row.event_status,
    remark: row.remark ?? "",
    userId: row.user_id,
    companyId: row.company_id ?? null,
    addressId: row.address_id,
    applicationId: row.application_id ?? null,
    isRemote: row.is_remote,
    meetingURL: row.meeting_URL ?? "",
    meetingSoftware: row.meeting_software ?? "",
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export function mapEventToDb(event: Event): EVENT_Row {
  return {
    id: event.id,
    name: event.name,
    event_type: event.eventType || null,
    start_time: event.startTime.toISOString(),
    duration: event.duration || null,
    event_status: event.eventStatus,
    remark: event.remark || null,
    user_id: event.userId,
    company_id: event.companyId || null,
    address_id: event.addressId,
    application_id: event.applicationId || null,
    is_remote: event.isRemote,
    meeting_URL: event.meetingURL || null,
    meeting_software: event.meetingSoftware || null,
    created_at: event.createdAt.toISOString(),
    updated_at: event.updatedAt.toISOString(),
  };
}