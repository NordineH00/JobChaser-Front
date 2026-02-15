import { useNavigate } from "react-router";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4 w-64">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Paramètres du compte
        </h1>

        <button
          onClick={() => navigate('/profile')}
          className="w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Gestion du profil
        </button>

        <button
          onClick={() => navigate('/personal-info')}
          className="w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Informations personnelles
        </button>

        <button
          onClick={() => navigate('/notifications')}
          className="w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Préférences de notification
        </button>

        <button
          onClick={() => navigate('/logout')}
          className="w-full px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Settings;