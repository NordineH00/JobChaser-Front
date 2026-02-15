import { Link } from "react-router";


export default function ResetPassword() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Réinitialisation du mot de passe
          </h1>

          {/* Message */}
          <p className="text-center text-gray-700">
            Un email de vient de vous être envoyé.  
            Vérifiez votre boîte de réception et suivez les instructions.
          </p>

          {/* Bouton connexion */}
          <Link
            to="/signin"
            className="block w-full text-center focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Se connecter
          </Link>

          {/* lien renvoyer */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">Vous n’avez pas reçu l’email ?</p>
            <button
              onClick={() => {
                console.log("Renvoyer l’email de réinitialisation");
                // Appel API pour renvoyer l’email
              }}
              className="mt-1 text-sm text-blue-600 hover:underline"
            >
              Renvoyer l’email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
