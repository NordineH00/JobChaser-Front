import type { Address } from "./address.interface";
import type { Application } from "./applications.interface";
import type { } from "./relation.interface";

export interface Company {
    id: string;
    name: string;
    registrationNumber?: string | undefined;
    comment?: string | null;
    addressId: string;
    address?: Address;
    applications?: Application[];
    isFavorite: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CompanyForm {
    name: string;
    registrationNumber?: string | undefined;
    comment?: string | null;
    addressId: string;
    streetName: string;
    streetNumber?: string | null;
    zipCode: number;
    city: string;
    country?: string | null;
    isFavorite: boolean;
}


export interface CompanyCreate {
    name: string;
    registrationNumber?: number | undefined;
    comment?: string | null;
    addressId?: string;
    isFavorite: boolean;
}