import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import type { SigninData } from '../interfaces/auth.interface';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../stores/auth.store';

export default function Signin() {
  const { register, handleSubmit, formState: { errors } } = useForm<SigninData>();
  const signinMutation = authService.signin();
  const { setSession } = useAuthStore();

  const navigate = useNavigate();

  const onSubmit = (values: SigninData) => {
    signinMutation.mutate(values, {
      onSuccess: (response) => {
        
        const user = response.user;
        const accessToken = response.data;

        // Mise à jour de la session (Zustand)
        setSession(user, accessToken);

        navigate('/');
      },
      onError: (error: any) => {
        console.error("Erreur lors de la connexion:", error);

        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Erreur lors de la connexion";

        alert(errorMessage);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Se connecter
          </h1>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Votre email</label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-800 block w-full p-2.5"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium  text-gray-900">Mot de passe</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 8 })}
                className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-800 block w-full p-2.5"
              />
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/lost-password"
                className="text-sm font-medium text-primary-600 hover:underline text-gray-900"
              >
                Mot de passe perdu ?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Valider
            </button>

            <p className="text-sm font-light text-gray-500">
              Vous n'avez pas de compte ?
              <a
                onClick={() => navigate('/signup')}
                className="font-medium text-primary-600 hover:underline cursor-pointer"
              >
                Enregistrez-vous
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
