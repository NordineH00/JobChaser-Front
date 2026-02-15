import { useApi } from "../hooks/useApi";


const api = useApi();

export interface DocumentPayload {
  title: string;
  type: string;       // "cv" | "lettre" | "autre"
  templateId: string;
  content: Record<string, any>;
  userId?: string;
  rendered?: string;
  mimeType?: "pdf" | "docx" | "html";
  isFavorite?: boolean;
}

// Créer un document
export const createDocument = async (payload: DocumentPayload) => {
  const res = await api.post("/documents", payload);
  return res.data;
};

// Récupérer tous les documents (optionnel : filtrer par type)
export const getDocuments = async (type?: string) => {
  const res = await api.get("/documents");
  if (type) {
    return res.data.filter((d: any) => d.type === type);
  }
  return res.data;
};

// Récupérer un document précis
export const getDocument = async (id: string) => {
  const res = await api.get(`/documents/${id}`);
  return res.data;
};

// Mettre à jour un document (ex: favoris)
export const updateDocument = async (id: string, update: Partial<DocumentPayload>) => {
  const res = await api.patch(`/documents/${id}`, update);
  return res.data;
};

// Supprimer un document
export const deleteDocument = async (id: string) => {
  const res = await api.delete(`/documents/${id}`);
  return res.data;
};

// Récupérer tous les templates
export const getTemplates = async () => {
  const res = await api.get("/templates");
  return res.data;
};
