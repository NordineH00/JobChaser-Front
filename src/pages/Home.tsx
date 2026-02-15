import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../stores/auth.store';
import Dashboard from "./Dashboard";

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {}, []);

  if (!isAuthenticated)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
          
          {/* HEADER */}
          <h1 className="text-3xl font-extrabold text-center text-gray-900">
            Bienvenue sur <span className="text-blue-600">JobChaser</span>
          </h1>
          <p className="text-center text-gray-600">
            Centralisez vos candidatures et suivez votre progression facilement.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/signin')}
              className="w-full text-sm text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 font-medium rounded-md px-4 py-2 transition"
            >
              Me connecter
            </button>

            <button
              onClick={() => navigate('/signup')}
              className="w-full text-sm text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 font-medium rounded-md px-4 py-2 transition"
            >
              M'enregistrer
            </button>
          </div>

          {/* PRESENTATION */}
          <div className="space-y-3 text-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 text-center">
              Présentation de l'application
            </h2>
            <p className="text-sm leading-relaxed">
              JobChaser est une application web moderne qui centralise la recherche d’emploi, la gestion de candidatures et la création de portfolio professionnel dans une interface intuitive et élégante.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Suivre ses candidatures</li>
              <li>Centraliser les offres</li>
              <li>Gérer les contacts RH</li>
              <li>Présenter son portfolio</li>
              <li>Analyser sa progression</li>
            </ul>
          </div>

        </div>
      </div>
    );

  return <Dashboard />;
}
