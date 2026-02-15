
import { useAppStore } from "../stores/application.store";
import { useApi } from "../hooks/useApi";
import type { Application, ApplicationCreate } from "../interfaces/applications.interface";

const api = useApi();


export async function updateApplication(): Promise<Application[]> {
  const { setApps } = useAppStore.getState();

  try {
    const res = await api.get('/applications');
    const data: Application[] = res.data ?? [];
    setApps(data);
    return data;
  } catch (e: any) {
    console.error("Erreur lors de la récupération des candidatures :", e?.message ?? e);
    setApps(null);
    return [];
  }
}

export async function createApplication(application: ApplicationCreate): Promise<Application | null> {

  try {
    const res = await api.post('/applications', application);
    return res.data;
  } catch (e: any) {
    console.error("Erreur lors de la création de la candidature :", e?.message ?? e);
    return null;
  }
}

export async function getOneApps(appsId: string): Promise<Application | undefined> {
  try {
    const res = await api.get(`/applications/${appsId}`);
    return res.data;
  } catch (e: any) {
    console.error("Erreur lors de la récupération de la candidature :", e?.message ?? e);
    return undefined;
  }
}