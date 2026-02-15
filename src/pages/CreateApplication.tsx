import { useNavigate } from "react-router";
import type { AddressCreate } from "../interfaces/address.interface";
import type { ApplicationCreate, ApplicationForm } from "../interfaces/applications.interface";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createAddress } from "../api/address.api";
import type { CompanyCreate } from "../interfaces/companies.interface";
import { createCompany } from "../api/company.api";
import { createApplication, updateApplication } from "../api/application.api";
import { registrationNumberParsed } from "../utils/convert";


const CreateApplication = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<ApplicationForm>();
    const [hiddenCompany, setHiddenCompany] = useState<boolean>(true);
    const [hiddenAddress, setHiddenAdress] = useState<boolean>(true);
    const onSubmit = async (data: ApplicationForm) => {
        try {
            console.log("form", data)
            let companyId: string | undefined;
            let addressId: string | undefined;

            if (!hiddenCompany) {
                if (!hiddenAddress) {

                    const addressPayload: AddressCreate = {
                        streetNumber: data.streetNumber || undefined,
                        streetName: data.streetName,
                        zipCode: data.zipCode,
                        city: data.city,
                        country: data.country || undefined,
                    };

                    const postAddress = await createAddress(addressPayload);
                    if (!postAddress) return;
                    addressId = postAddress.id;
                }
                const companyPayload: CompanyCreate = {
                    name: data.name,
                    registrationNumber: registrationNumberParsed(data.registrationNumber) || undefined,
                    comment: data.comment || undefined,
                    isFavorite: false,
                    ...(addressId ? { addressId } : {})
                }
                console.log("companyPayload", companyPayload)
                const postCompany = await createCompany(companyPayload);
                if (!companyPayload) return;
                companyId = postCompany?.id;
            }

            const applicationPayload: ApplicationCreate = {
                jobTitle: data.jobTitle,
                jobReference: data.jobReference || undefined,
                appStatus: "PENDING",
                phoneNumber: data.phoneNumber || undefined,
                contact: data.contact || undefined,
                email: data.email || undefined,
                observation: data.observation || undefined,
                isFavorite: false,
                ...(companyId ? { companyId } : {})   // <-- champ présent uniquement si défini
            };
            console.log("applicationcreate", applicationPayload)

            await createApplication(applicationPayload);

            await updateApplication?.();

            navigate(-1)

        } catch (error: any) {
            console.error('Erreur dans le formulaire', error?.message);
        }
    };


    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-100">
            {/* Titre */}
            <h1 className="text-2xl font-bold text-gray-800 text-center">
                Création d&apos;une candidature
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Champ titre du job */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Intitulé de la candidature <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ex: Développeur Fullstack"
                        {...register("jobTitle", { required: true })}
                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.jobTitle && (
                        <p className="text-sm text-red-600 mt-1">Ce champ est requis.</p>
                    )}
                </div>

                {/* Champ référence */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Référence du job (optionnel)
                    </label>
                    <input
                        type="text"
                        placeholder="REF-DEV-TS-2025-0042"
                        {...register("jobReference")}
                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Champ contact */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom du contact (optionnel)
                    </label>
                    <input
                        type="text"
                        placeholder="Michel Sardou"
                        {...register("contact")}
                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* numéro de téléphone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Numéro de téléphone (optionnel)
                    </label>
                    <input
                        type="text" // garder text pour conserver les 0 initiaux
                        placeholder="06 12 34 56 78"
                        {...register("phoneNumber")}
                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse e-mail (optionnel)
                    </label>
                    <input
                        type="email"
                        placeholder="bob.durand@gmail.com"
                        {...register("email")}
                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* observation */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Observation sur la candidature (optionnel)
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Exemple : penser à joindre le CV"
                        {...register("observation")}
                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Bouton afficher/masquer company */}
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={() => setHiddenCompany(prev => !prev)}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition bg-green-600 text-white hover:bg-green-700"
                    >
                        {hiddenCompany ? "Ajouter une entreprise" : "Masquer l'entreprise"}
                    </button>
                </div>

                {/* Champs company conditionnels */}
                {!hiddenCompany && (
                    <div className="space-y-4 border-t pt-4">
                        {/* Nom */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nom de l&apos;entreprise <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: ACME Corp"
                                {...register("name", { required: true })}
                                className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 mt-1">Ce champ est requis.</p>
                            )}
                        </div>

                        {/* SIRET */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Numéro SIRET (optionnel)
                            </label>
                            <input
                                type="text"
                                placeholder="12345678900012"
                                {...register("registrationNumber")}
                                className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* Commentaire */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Remarque (optionnel)
                            </label>
                            <textarea
                                rows={3}
                                placeholder="Ajouter une remarque..."
                                {...register("comment")}
                                className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* Bouton afficher/masquer adresse */}
                        <div className="flex justify-between items-center">
                            <button
                                type="button"
                                onClick={() => setHiddenAdress(prev => !prev)}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition bg-green-600 text-white hover:bg-green-700"
                            >
                                {hiddenAddress ? "Ajouter une adresse" : "Masquer l'adresse"}
                            </button>
                        </div>

                        {/* Champs Adresse conditionnels */}
                        {!hiddenAddress && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Numéro de rue (optionnel)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ex: 12B"
                                        {...register("streetNumber")}
                                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Rue <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Rue des Lilas"
                                        {...register("streetName", { required: true })}
                                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    {errors.streetName && (
                                        <p className="text-sm text-red-600 mt-1">Ce champ est requis.</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Code postal <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text" // garder text pour conserver les 0 initiaux
                                        placeholder="75001"
                                        {...register("zipCode", { required: true })}
                                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    {errors.zipCode && (
                                        <p className="text-sm text-red-600 mt-1">Ce champ est requis.</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ville <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Paris"
                                        {...register("city", { required: true })}
                                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    {errors.city && (
                                        <p className="text-sm text-red-600 mt-1">Ce champ est requis.</p>
                                    )}
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pays (optionnel)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ex: France"
                                        {...register("country")}
                                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Bouton de validation */}
                <div className="pt-4 border-t">
                    <input
                        type="submit"
                        value="Créer la candidature"
                        className="w-full px-4 py-2 rounded-lg bg-green-700 text-white font-medium hover:bg-green-800 cursor-pointer transition"
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateApplication