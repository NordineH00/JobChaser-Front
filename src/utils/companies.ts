
import { useCompStore } from "../stores/company.store";
import type { Company } from "../interfaces/relation.interface";

export function getOneComp(companyId: Company["id"]): Company | null {
    const companys = useCompStore((state) => state.comps)
    const found = companys?.find((comp) => comp.id === companyId);
    return found ?? null;
}