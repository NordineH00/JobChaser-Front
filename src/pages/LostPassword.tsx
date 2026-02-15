import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
};

export default function LostPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Demande de reset password :", data);
    // Appel API pour envoyer l'email de réinitialisation
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Mot de passe oublié
          </h1>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Champ email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Votre email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-800 block w-full p-2.5"
              />
              {errors.email && <p className="text-red-500 text-sm">Email requis</p>}
            </div>

            {/* Bouton envoyer */}
            <button
              type="submit"
              className="w-full focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
