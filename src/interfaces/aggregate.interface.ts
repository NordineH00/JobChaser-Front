import type { Address, Application, Company, DocType } from "./relation.interface";


export type DocumentWithType = Document & { docType: DocType | null };

export interface ApplicationFull {
    application: Application;
    company: Company | null;
    companyAddress: Address | null;
    documents: DocumentWithType[];
    events: Array<Event & { address: Address | null }>;
}