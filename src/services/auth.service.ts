/**
 * Service d'authentification - Gère les opérations d'inscription et de connexion
 * Utilise React Query pour la gestion des mutations asynchrones
 */

// Importation des hooks React Query pour les mutations
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
// Importation des fonctions API pour l'authentification
import { signup, signin } from "../api/auth.api";
// Importation des types TypeScript pour l'authentification
import type { SignupData, SigninData, AuthResponse } from "../interfaces/auth.interface";

/**
 * Classe AuthService - Encapsule les opérations d'authentification
 * Utilise le pattern Singleton pour une instance unique
 */
class AuthService {

  /**
   * Méthode pour l'inscription d'un nouvel utilisateur
   * @returns UseMutationResult - Hook de mutation React Query pour l'inscription
   */
  public signup(): UseMutationResult<AuthResponse, Error, SignupData> {
    return useMutation({
      // Fonction de mutation qui sera appelée lors de l'exécution
      mutationFn: (user: SignupData) => signup(user),
    });
  }

  /**
   * Méthode pour la connexion d'un utilisateur existant
   * @returns UseMutationResult - Hook de mutation React Query pour la connexion
   */
  public signin(): UseMutationResult<AuthResponse, Error, SigninData> {
    return useMutation({
      // Fonction de mutation qui sera appelée lors de l'exécution
      mutationFn: (user: SigninData) => signin(user),
    });
  }
}

// Export d'une instance unique du service (pattern Singleton)
export const authService = new AuthService();
