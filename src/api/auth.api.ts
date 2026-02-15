


import { useApi } from "../hooks/useApi";

import type { SignupData, SigninData, AuthResponse } from "../interfaces/auth.interface";



// Initialisation de l'instance API avec les intercepteurs configurés
const api = useApi();

/**
 * Fonction pour l'inscription d'un nouvel utilisateur
 * @param data - Données d'inscription (prénom, nom, email, mot de passe, confirmation)
 * @returns Promise<AuthResponse> - Réponse contenant les tokens et informations utilisateur
 */
export const signup = async (data: SignupData): Promise<AuthResponse> => {

  try {
    // Envoi de la requête POST vers l'endpoint d'inscription
    const { data: response } = await api.post<AuthResponse>('/auth/signup', data);
    return response;
  } catch (error: any) {
    // Propagation de l'erreur pour gestion dans les composants
    throw new Error(error);
  }
};

/**
 * Fonction pour la connexion d'un utilisateur existant
 * @param data - Données de connexion (email et mot de passe)
 * @returns Promise<AuthResponse> - Réponse contenant les tokens et informations utilisateur
 */
export const signin = async (data: SigninData): Promise<AuthResponse> => {
  
  try {
    // Envoi de la requête POST vers l'endpoint de connexion
    const { data: response } = await api.post<AuthResponse>('/auth/signin', data);
    
    return response;
  } catch (error: any) {
    // Propagation de l'erreur pour gestion dans les composants
    throw new Error(error);
  }
};
