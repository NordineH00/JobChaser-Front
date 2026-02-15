import { useApi } from "../hooks/useApi";
import { useAddressStore } from "../stores/address.store";
import type { Address, AddressCreate } from "../interfaces/address.interface";

const api = useApi();


export async function updateAddress(): Promise<Address[]> {
    const { setAddress } = useAddressStore.getState();

    try {
        const res = await api.get('/address');
        console.log("res server", res)
        const data: Address[] = res.data ?? [];
        setAddress(data);
        return data;
    } catch (e: any) {
        console.error("Erreur lors de la récupération des adresses :", e?.message ?? e);
        setAddress(null);
        return [];
    }
}

export async function createAddress(address: AddressCreate): Promise<Address | null> {

    try {
        const res = await api.post('/address', address);
        return res.data;
    } catch (e: any) {
        console.error("Erreur lors de la création de l'adresse :", e?.message ?? e);
        return null;
    }
}

export async function getOneAddress(addressId: string): Promise<Address | undefined> {
    try {
        const res = await api.get(`/address/${addressId}`);
        console.log("getoneaddress", res.data)
        return res.data;
    } catch (e: any) {
        console.error("Erreur lors de la récupération de la adresse :", e?.message ?? e);
        return undefined;
    }
}