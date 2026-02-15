import { useForm } from "react-hook-form";
import type { CompanyCreate, CompanyForm } from "../interfaces/companies.interface";
import { useState } from "react";
import { createCompany, updateCompany } from "../api/company.api";
import { createAddress } from "../api/address.api";
import type { AddressCreate } from "../interfaces/address.interface";
import { useNavigate } from "react-router";
import { registrationNumberParsed } from "../utils/convert";


const CreateCompany = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<CompanyForm>();
    const [hiddenAddress, setHiddenAdress] = useState<boolean>(true);
    const onSubmit = async (data: CompanyForm) => {
        try {
            let addressId: string | undefined;

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
                comment: data.comment ?? null,
                isFavorite: false,
                ...(addressId ? { addressId } : {})
            };
            console.log("companycreate", companyPayload)

            await createCompany(companyPayload);

            await updateCompany?.();
            navigate(-1)

        } catch (error: any) {
            console.error('Erreur dans le formulaire', error?.message);
        }
    };


    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-100">
            {/* Titre */}
            <h1 className="text-2xl font-bold text-gray-800 text-center">
                Création d'une entreprise
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Champ Nom */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom de l'entreprise <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ex: ACME Corp"
                        {...register("name", { required: true })}
                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.name && <p className="text-sm text-red-600 mt-1">Ce champ est requis.</p>}
                </div>

                {/* Champ SIRET */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Numéro SIRET (optionnel)
                    </label>
                    <input
                        type="text"
                        placeholder="Ex: 12345678900012"
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

                {/* Bouton afficher adresse */}
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={() => setHiddenAdress((prev) => !prev)}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition
          bg-green-600 text-white hover:bg-green-700"
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
                                type="number"
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
                            {errors.streetName && <p className="text-sm text-red-600 mt-1">Ce champ est requis.</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Code Postal <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Ex: 75001"
                                {...register("zipCode", { required: true })}
                                className="w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {errors.zipCode && <p className="text-sm text-red-600 mt-1">Ce champ est requis.</p>}
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
                            {errors.city && <p className="text-sm text-red-600 mt-1">Ce champ est requis.</p>}
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

                {/* Bouton de validation */}
                <div className="pt-4 border-t">
                    <input
                        type="submit"
                        value="Créer l'entreprise"
                        className="w-full px-4 py-2 rounded-lg bg-green-700 text-white font-medium hover:bg-green-800 cursor-pointer transition"
                    />
                </div>
            </form>
        </div>

    )
}

export default CreateCompany;