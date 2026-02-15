import type { Address } from "./address.interface";
import type { Company } from "./companies.interface";

export interface EventCalendar {
    id: string;
    name: string;
    startTime: string;
};

export interface Event {
    id: string;
    name: string;
    eventType?: string | null;
    startTime: Date;
    duration?: number | null;
    eventStatus: string;
    remark?: string | null;
    userId: string;
    company?: Company;
    companyId?: string | null;
    addressId?: string;
    address?: Address;
    applicationId?: string | null;
    isRemote: boolean;
    meetingURL?: string | null;
    meetingSoftware?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface EventForm {
    name: string;
    eventType?: string | null;
    startTime: Date;
    duration?: number | null;
    //eventStatus: string;
    remark?: string | null;
    //isRemote: boolean;
    //meetingURL?: string | null;
    //meetingSoftware?: string | null;
}