import { updateApplication } from "../api/application.api";
import { updateCompany } from "../api/company.api";
import { getAllEvents } from "../api/event.api";

export function updateData() {
    updateApplication();
    updateCompany();
    getAllEvents();
    return;
}