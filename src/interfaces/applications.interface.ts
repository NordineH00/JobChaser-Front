import type { ApplicationStatus } from "./status.interface";

export interface Application {
    id: string;
    jobTitle: string;
    jobReference?: string | null;
    appStatus: ApplicationStatus;
    phoneNumber?: string | null;
    contact?: string | null;
    email?: string | null;
    observation?: string | null;
    userId: string;
    companyId: string;
    isFavorite: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApplicationForm {
    jobTitle: string;
    jobReference?: string | null;
    appStatus: ApplicationStatus;
    phoneNumber?: string | null;
    contact?: string | null;
    email?: string | null;
    observation?: string | null;
    name: string;
    registrationNumber?: string | null;
    comment?: string | null;
    addressId: string;
    streetName: string;
    streetNumber?: string | null;
    zipCode: number;
    city: string;
    country?: string | null;
    isFavorite: boolean;

}

export interface ApplicationCreate {
    jobTitle: string;
    jobReference?: string | null;
    appStatus: ApplicationStatus;
    phoneNumber?: string | null;
    contact?: string | null;
    email?: string | null;
    observation?: string | null;
    isFavorite: boolean;
    companyId?: string;
}