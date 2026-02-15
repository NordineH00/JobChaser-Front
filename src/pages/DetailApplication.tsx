import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { ApplicationStatus } from "../interfaces/status.interface";
import { getOneApps } from "../api/application.api";
import { getOneCompany } from "../api/company.api";

import { getEventsbyAppsId } from "../api/event.api";
import type { Application } from "../interfaces/applications.interface";
import type { Company } from "../interfaces/companies.interface";
import type { Address } from "../interfaces/address.interface";
import type { Event } from "../interfaces/events.interface";

const statusStyles: Record<ApplicationStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200",
    CLOSED: "bg-blue-100 text-blue-800 ring-1 ring-blue-200",
    ACCEPTED: "bg-green-100 text-green-800 ring-1 ring-green-200",
    REJECTED: "bg-red-100 text-red-800 ring-1 ring-red-200",
};

const statusLabel: Record<ApplicationStatus, string> = {
    PENDING: "En attente",
    CLOSED: "Clôturée",
    ACCEPTED: "Acceptée",
    REJECTED: "Refusée",
};

const DetailApplication = () => {
    const navigate = useNavigate();

    const [application, setApplication] = useState<Application | null>(null);
    const [company, setCompany] = useState<Company | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [documents, setDocuments] = useState<any[]>([]);
    const [companyAddress, setCompanyAddress] = useState<Address | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { id: appsId } = useParams<{ id: string }>();

    useEffect(() => {
        if (!appsId) {
            setError("Identifiant de candidature manquant.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const applicationData = await getOneApps(appsId);
                if (!applicationData) return
                setApplication(applicationData);

                if (applicationData.companyId) {
                    const companyData = await getOneCompany(applicationData.companyId);
                    setCompany(companyData ?? null);
                } else {
                    setCompany(null);
                }

                const eventData = await getEventsbyAppsId(applicationData.id);
                console.log("getcompany", eventData)
                setEvents(eventData ?? []);

                // const docs = await getDocs(appsId); setDocuments(docs ?? []);
            } catch (err: any) {
                setError(err?.message ?? "Erreur inconnue");
                console.error("Erreur lors du chargement :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [appsId]);

    if (!appsId) return <p>Identifiant introuvable.</p>;
    if (loading) return <p>Chargement...</p>;
    if (error) return <p className="text-red-600">Erreur : {error}</p>;
    if (!application) return <p>Aucune candidature trouvée.</p>;

    // IMPORTANT : ne pas lowerCase ici, on garde les clés en MAJUSCULES
    const statusKey = application.appStatus as ApplicationStatus;

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
                    <h1 className="mt-2 text-2xl font-bold text-gray-900">{application.jobTitle}</h1>
                    <p className="text-sm text-gray-500">
                        {company?.name ?? "Entreprise inconnue"}
                        {application.jobReference ? ` · Réf. ${application.jobReference}` : ""}
                    </p>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[statusKey]}`}>
                    {statusLabel[statusKey]}
                </span>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column */}
                <div className="md:col-span-2 space-y-6">
                    {/* Candidature card */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h2 className="text-lg text-black font-semibold mb-4">Informations de la candidature</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <Info label="Contact" value={application.contact} />
                            <Info label="Téléphone" value={application.phoneNumber} />
                            <Info label="Email" value={application.email} />
                            <Info label="Observation" value={application.observation} />
                        </div>
                    </section>

                    {/* Events timeline */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h2 className="text-lg text-black font-semibold mb-4">Entretiens & événements</h2>
                        {events.length === 0 ? (
                            <div className="text-sm text-gray-500">Aucun événement</div>
                        ) : (
                            <ol className="relative border-l border-gray-200 ml-3">
                                {events.map((event) => {
                                    const start = new Date(event.startTime); // ← parse string ISO
                                    return (
                                        <li key={event.id} className="mb-6 ml-6">
                                            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 ring-2 ring-white shadow">
                                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M7 2a1 1 0 0 0-1 1v1H5a3 3 0 0 0-3 3v1h20V7a3 3 0 0 0-3-3h-1V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-1-1zM22 9H2v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9z" />
                                                </svg>
                                            </span>
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                                <div className="font-medium text-gray-900">{event.name}</div>
                                                <div className="text-sm text-gray-600">
                                                    {isNaN(start.getTime()) ? "Date invalide" : start.toLocaleString("fr-FR")}
                                                </div>
                                            </div>
                                            {/*<div className="mt-1 text-sm text-gray-600">
                                                {event.meetingURL
                                                    ? `${event.address.streetName}, ${event.address.zipCode} ${event.address.city}`
                                                    : event.isRemote
                                                        ? `À distance${event.meetingSoftware ? ` · ${event.meetingSoftware}` : ""}`
                                                        : "—"}
                                            </div>*/}
                                            {event.isRemote && event.meetingURL && (
                                                <a
                                                    href={event.meetingURL}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="mt-1 inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline"
                                                >
                                                    Ouvrir la visioconférence
                                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M7 7h10v10" />
                                                    </svg>
                                                </a>
                                            )}
                                        </li>
                                    );
                                })}
                            </ol>
                        )}
                    </section>

                    {/* Documents */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h2 className="text-lg text-black font-semibold mb-4">Documents associés</h2>
                        {documents.length === 0 ? (
                            <div className="text-sm text-gray-500">Aucun document</div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {documents.map((doc) => (
                                    <li key={doc.id} className="py-3 flex items-center justify-between">
                                        <div className="min-w-0">
                                            <div className="font-medium text-gray-900 truncate">{doc.title}</div>
                                            <div className="text-xs text-gray-500">{doc.docType?.type ?? "—"}</div>
                                        </div>
                                        <button className="text-sm text-indigo-600 hover:underline">Voir</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>

                {/* Right column */}
                <aside className="space-y-6">
                    {/* Company */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h2 className="text-lg text-black font-semibold mb-4">Entreprise</h2>
                        <button onClick={() => navigate(`/companies/${company?.id}`)}>

                            <div className="font-medium text-gray-900">{company?.name ?? "—"}</div>
                            {companyAddress ? (
                                <div className="mt-1 text-sm text-gray-600">
                                    {companyAddress.streetNumber ? `${companyAddress.streetNumber} ` : ""}
                                    {companyAddress.streetName}
                                    <br />
                                    {companyAddress.zipCode} {companyAddress.city}
                                    {companyAddress.country ? `, ${companyAddress.country}` : ""}
                                </div>
                            ) : (
                                <div className="text-sm text-gray-500">Adresse non renseignée</div>
                            )}
                        </button>
                    </section>

                    {/* Actions */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h2 className="text-lg font-semibold mb-4">Actions</h2>
                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={() => navigate(`/applications/new?companyId=${application.id}`)}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                            >
                                ➕ Ajouter une candidature
                            </button>
                            <button
                                onClick={() => navigate(`/companies/${application.id}/edit`)}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                            >
                                ✏️ Modifier la candidature
                            </button>
                            <button
                                onClick={() => navigate(`/companies/${application.id}/delete`)}
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
};

export default DetailApplication;


function Info({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="space-y-1">
            <div className="text-gray-500">{label}</div>
            <div className="font-medium text-gray-900">{value || "—"}</div>
        </div>
    );
}