import { useApi } from '../hooks/useApi';

export const useTemplatesApi = () => {
  const api = useApi();

  return {
    getTemplates: () => api.get('/templates'),
    getTemplate: (id: string) => api.get(`/templates/${id}`),
    createTemplate: (data: any) => api.post('/templates', data),
    updateTemplate: (id: string, data: any) => api.put(`/templates/${id}`, data),
    deleteTemplate: (id: string) => api.delete(`/templates/${id}`),
  };
};
