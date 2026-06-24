
import type {DocType} from "./documents.interface";
import type {Address} from "./address.interface"
import type  {Application} from "./applications.interface";
import type  {Event} from "./events.interface";
import type  {Document} from "./documents.interface";
import type {Company} from "./companies.interface";


export type DocumentWithType = Document & { docType: DocType | null };

export interface ApplicationFull {
    application: Application;
    company: Company | null;
    companyAddress: Address | null;
    documents: DocumentWithType[];
    events: Array<Event & { address: Address | null }>;
}