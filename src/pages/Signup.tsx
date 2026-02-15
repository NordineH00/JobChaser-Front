import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { SignupData } from '../interfaces/auth.interface';
import { authService } from '../services/auth.service';



interface IErrorPassaword {
    minLength: { message: string; validate: boolean };
    hasUpperCase: { message: string; validate: boolean };
    hasLowerCase: { message: string; validate: boolean };
    hasNumber: { message: string; validate: boolean };
    hasSpecialChar: { message: string; validate: boolean };
}

export default function Signup() {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<SignupData>();
    const navigate = useNavigate();
    // Cette mutation sera utilisée pour envoyer les données au serveur
  const signupMutation = authService.signup();


    //fonction pour l'envoie du formulaire
    const onSubmit = (form: SignupData) => {
    // Exécution de la mutation d'inscription avec les données du formulaire
    signupMutation.mutate(form, {
      
      onSuccess: () => {
        
        navigate('/register');
      },
      
      onError: (error: any) => {
        console.error("Erreur lors de l'inscription:", error);
      }
    });
  };


    //fonction qui attend si on charge
    const isLoading = signupMutation.status === "pending";

    const [errorPassword, setErrorPassword] = useState<IErrorPassaword>({
        minLength: {
            message: 'Le mot de passe doit contenir au moins 8 caractères',
            validate: false,
        },
        hasUpperCase: {
            message: 'Le mot de passe doit contenir au moins une lettre majuscule',
            validate: false,
        },
        hasLowerCase: {
            message: 'Le mot de passe doit contenir au moins une lettre minuscule',
            validate: false,
        },
        hasNumber: {
            message: 'Le mot de passe doit contenir au moins un nombre',
            validate: false,
        },
        hasSpecialChar: {
            message: 'Le mot de passe doit contenir au moins un caractère spécial',
            validate: false,
        },
    });

    const validatePassword = (value: string) => {
        setErrorPassword((prevState) => ({
            ...prevState,
            minLength: {
                ...prevState.minLength,
                validate: value.length >= 8,
            },
            hasUpperCase: {
                ...prevState.hasUpperCase,
                validate: /[A-Z]/.test(value),
            },
            hasLowerCase: {
                ...prevState.hasLowerCase,
                validate: /[a-z]/.test(value),
            },
            hasNumber: {
                ...prevState.hasNumber,
                validate: /[0-9]/.test(value),
            },
            hasSpecialChar: {
                ...prevState.hasSpecialChar,
                validate: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            },
        }));

    };

    const handleValidatePassword = (value: string) => {
        validatePassword(value);
    };


    return (

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8  ">
                    <h1 data-cy="heading" className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        S'enregistrer
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Pseudo</label>
                            <input role="pseudo" autoComplete="off" type="text" id="pseudo" {...register("pseudo", { required: true })} className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-800 block w-full p-2.5" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Votre email</label>
                            <input role="email" autoComplete="off" type="email" id="email" {...register("email", { required: true })} className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-800 block w-full p-2.5" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium  text-gray-900">Mot de passe</label>
                            <input role="password" type="password" spellCheck="false" autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="none" {...register("password", { required: true, min: 8 })} onChange={(e) => handleValidatePassword(e.target.value)} className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-800 block w-full p-2.5" />
                        </div>
                        {Object.entries(errorPassword).map(([key, value]) => (
                            <div
                                key={key}
                                className='mb-1 flex justify-between items-center'
                            >
                                <div
                                    className={`m-0 text-[10px] font-[Bion,Arial,sans-serif] ${value.validate ? "text-green-500" : "text-red-500"}`}
                                >
                                    {value.message}
                                </div>
                                <span>{value.validate ? "✓" : "✗"}</span>
                            </div>
                        ))}
                        <div>
                            <label className="block mb-2 text-sm font-medium  text-gray-900">Confirmation du mot de passe</label>
                            <input role="confirmPassword" type="password" {...register("confirmPassword", {
                                required: true, min: 8, validate: (val) =>
                                    val === getValues("password") || "Les mots de passe ne correspondent pas",
                            })} className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-800 block w-full p-2.5" />
                            <div data-cy="alert">
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                                )}
                                {errors && <p className="text-red-500 text-sm">Le mail ou le pseudo est déjâ enregistré sur ce site</p>}
                            </div>
                        </div>
                        <button data-cy="signup" type="submit" className="w-full focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            {isLoading ? "Création du compte..." : "S'inscrire"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}