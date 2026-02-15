import { useAuthStore } from '../stores/auth.store';
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

declare const __API_URL__: string;

export function useApi(): AxiosInstance {
  const api: AxiosInstance = axios.create({
    baseURL: __API_URL__,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  });

  // ajouter access token sur chaque requête
  
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
 
  config.headers = config.headers ?? {};

  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    (config.headers as Record<string, string>)['Authorization'] = 'Bearer ' + accessToken;
  }

  return config;
});


  // refresh logic
  let isRefreshing = false;
  let failedQueue: {
    resolve: (value?: unknown) => void,
    reject: (reason?: any) => void,
    config: AxiosRequestConfig
  }[] = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject, config }) => {
      if (error) {
        reject(error);
      } else {
        if (token) {
          config.headers = config.headers ?? {};
          config.headers['Authorization'] = 'Bearer ' + token;
        }
        resolve(api(config));
      }
    });
    failedQueue = [];
  };

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      if (!originalRequest) return Promise.reject(error);

      const status = error.response?.status;

      // si 401 et pas déjà retryée
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          // push dans la queue et attends le résultat du refresh
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject, config: originalRequest });
          });
        }

        isRefreshing = true;

        try {
          
          const refreshRes = await api.post('/auth/refreshtoken', {}, { withCredentials: true });

          const newAccessToken = refreshRes.data;

          if (!newAccessToken) {
            throw new Error('No access token in refresh response');
          }

         
          useAuthStore.getState().setAccessToken(newAccessToken);

         
          processQueue(null, newAccessToken);

          
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
          isRefreshing = false;

          return api(originalRequest);
        } catch (e) {
          isRefreshing = false;
          processQueue(e, null);
          useAuthStore.getState().logout();
          return Promise.reject(e);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
