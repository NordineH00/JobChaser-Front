

import { useCompStore } from "../stores/company.store";
import { useApi } from "../hooks/useApi";
import type { Company, CompanyCreate } from "../interfaces/companies.interface";

const api = useApi();



export async function updateCompany(): Promise<Company[]> {
    const { setComps } = useCompStore.getState();
    try {
        const res = await api.get('/companies');
        const data: Company[] = res.data ?? [];
        setComps(data);
        return data;
    } catch (e: any) {
        console.error("Erreur lors de la récupération des entreprises :", e?.message ?? e);
        setComps(null);
        return [];
    }
}

export async function createCompany(company: CompanyCreate): Promise<Company | null> {

    try {
        const res = await api.post('/companies', company);
        return res.data;
    } catch (e: any) {
        console.error("Erreur lors de la création de l'entreprise :", e?.message ?? e);
        return null;
    }
}

export async function getOneCompany(compId: string): Promise<Company | undefined> {
    try {
        const res = await api.get(`/companies/${compId}`);
        return res.data;
    } catch (e: any) {
        console.error("Erreur lors de la récupération de l'entreprise' :", e?.message ?? e);
        return undefined;
    }
}