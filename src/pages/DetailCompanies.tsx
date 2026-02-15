import { useNavigate, useParams } from "react-router";
import { getOneCompany } from "../api/company.api";
import { useEffect, useState } from "react";
import type { Company } from "../interfaces/companies.interface";
import { ApplicationCard } from "../components/Card/ApplicationCard";


const DetailCompanies = () => {
    const navigate = useNavigate()
    const { id: compId } = useParams<{ id: string }>();
    const [company, setCompany] = useState<Company | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!compId) {
            setError("Entreprise introuvable");
            setLoading(false);
            return;
        }

        (async () => {
            try {
                const res = await getOneCompany(compId);
                setCompany(res ?? null)
            } catch (error) {
                setError("Erreur lors du changement de l'entreprise")
            } finally {
                setLoading(false)
            }
        })();

    }, [compId]);

    if (loading) {
        return <p className="text-center text-gray-500 mt-10">Chargement...</p>;
    }
    console.log("company", company)

    if (error || !company) {
        return (
            <div className="text-center mt-10">
                <p className="text-red-600 text-lg font-medium mb-4">
                    {error ?? "Aucune entreprise trouvée"}
                </p>
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => navigate(-1)}
                >
                    Retour
                </button>
            </div>
        );
    }


    if (company === null) {
        return (
            <div className="text-center mt-10">
                <p className="text-red-600 text-lg font-medium mb-4">
                    {error ?? "Aucune données sur cette entreprise"}
                </p>
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => navigate(-1)}
                >
                    Retour
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 pb-24 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Retour
                    </button>
                    <h1 className="mt-2 text-2xl font-bold text-gray-900">{company.name}</h1>

                </div>


            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div className=" md:col-span-2 space-y-6">
                    {/* Information company */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h2 className="text-lg text-black font-semibold mb-4">Informations de l'entreprise'</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>{company.address?.streetNumber}</div>
                            <div>{company.address?.streetName}</div>
                            <div>{company.address?.zipCode}</div>
                            <div>{company.address?.city}</div>
                            <div>{company.address?.country}</div>
                        </div>
                    </section>

                    {/* application card*/}
                    {company.applications?.map((comp) => <ApplicationCard application={comp} />)}

                </div>
                {/* Right column */}
                <aside className="space-y-6 md:col-start-3">
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:sticky md:top-4">
                        <h2 className="text-lg font-semibold mb-4 text-black">Actions</h2>
                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={() => navigate(`/applications/new?companyId=${company.id}`)}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                            >
                                ➕ Ajouter une candidature
                            </button>
                            <button
                                onClick={() => navigate(`/companies/${company.id}/edit`)}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                            >
                                ✏️ Modifier l’entreprise
                            </button>
                            <button
                                onClick={() => navigate(`/companies/${company.id}/delete`)}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                            >
                                🗑 Supprimer
                            </button>
                        </div>
                    </section>
                </aside>
            </div>
        </div>

    );
}

export default DetailCompanies;