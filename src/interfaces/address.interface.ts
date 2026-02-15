export interface Address {
    id: string;
    streetName: string;
    streetNumber?: string | null;
    zipCode: number;
    city: string;
    country?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type AddressCreate = {
    streetNumber?: string | null;
    streetName: string;
    zipCode: number;
    city: string;
    country?: string | null;
};