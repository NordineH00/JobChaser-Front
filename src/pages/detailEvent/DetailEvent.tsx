import { useNavigate, useParams } from "react-router";
import { useEventStore } from "../../stores/event.store";
import { dateStr, timeStr, toLocalDateTime } from "../../utils/convert";
import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "../../components/badge";
import { useForm } from "react-hook-form";
import type { Event, EventForm } from "../../interfaces/events.interface";
import { ErrorAllEvent, ErrorOneEvent } from "./messageError";
import { updateEvents } from "../../api/event.api";



const DetailEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isUpdate, setIsUpdate] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EventForm>();
    const updateEventInStore = useEventStore(s => s.updateEvent);

    //Récupération des évènement dans le store
    const events = useEventStore((s) => s.events);
    if (!events || events.length === 0) {
        return <ErrorAllEvent />
    }

    //Récupération de l'évènement avec l'id
    const fetchEvent = useMemo(() => events.find((e) => e.id === id), [events, id]);
    if (!fetchEvent) {
        return <ErrorOneEvent />
    }

    const [event, setEvent] = useState<Event>(fetchEvent)

    // Quand on passe en mode édition, on pré-remplit le form
    useEffect(() => {
        if (isUpdate) {
            reset({
                name: event.name ?? "",
                startTime: event.startTime,
                duration: event.duration ?? undefined,
                eventType: event.eventType ?? "OTHER",
                remark: event.remark ?? "",
            });
        }
    }, [isUpdate, event, reset]);

    const onSubmit = async (data: EventForm) => {
        try {
            await updateEvents(event.id, data);
            setEvent(prev => ({ ...prev, ...data }));
            updateEventInStore(event.id, data)
            setIsUpdate(false);
            navigate(-1);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-100">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Détails de l&apos;évènement</h1>
                            <p className="text-sm text-gray-500">
                                {event.company?.name ? `Entreprise : ${event.company.name}` : "Entreprise non renseignée"}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <StatusBadge event={event} />
                        </div>
                    </div>

                    {/* Infos principales */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4">
                            <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Nom</div>
                            {isUpdate ? (
                                <>
                                    <input
                                        type="text"
                                        className="w-full rounded border p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        {...register("name", { required: true })}
                                    />
                                    {errors.name && <p className="text-xs text-red-600 mt-1">Le nom est requis.</p>}
                                </>
                            ) : (
                                <div className="font-medium text-gray-800">{event.name}</div>
                            )}
                        </div>

                        <div className="rounded-lg border p-4">
                            <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Date & heure</div>
                            {isUpdate ? (
                                <input
                                    type="datetime-local"
                                    value={toLocalDateTime(event.startTime)}
                                    className="w-full rounded border p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    {...register("startTime", { required: true })}
                                />
                            ) : (
                                <div className="font-medium text-gray-800">
                                    {dateStr(event.startTime)} <span className="text-gray-500">à</span> {timeStr(event.startTime)}
                                </div>
                            )}
                        </div>

                        <div className="rounded-lg border p-4">
                            <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Durée</div>
                            {isUpdate ? (
                                <>
                                    <input
                                        type="number"
                                        className="w-full rounded border p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        {...register("duration", { valueAsNumber: true, min: 0 })}
                                    />
                                    {errors.duration && <p className="text-xs text-red-600 mt-1">Durée invalide.</p>}
                                </>
                            ) : (
                                <div className="font-medium text-gray-800">{event.duration ? `${event.duration} min` : "—"}</div>
                            )}
                        </div>

                        <div className="rounded-lg border p-4">
                            <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Type</div>
                            {isUpdate ? (
                                <select
                                    className="w-full rounded border p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    {...register("eventType")}
                                >
                                    <option value="INTERVIEW">INTERVIEW</option>
                                    <option value="JOB_FAIR">JOB_FAIR</option> {/* (sans espace) */}
                                    <option value="JOB_DATING">JOB_DATING</option>
                                    <option value="CONFERENCE">CONFERENCE</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            ) : (
                                <div className="font-medium text-gray-800">{event.eventType ?? "—"}</div>
                            )}
                        </div>
                    </div>

                    {/* Remarque */}
                    <div className="rounded-lg border p-4">
                        <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Remarque</div>
                        {isUpdate ? (
                            <input
                                type="text"
                                className="w-full rounded border p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                {...register("remark")}
                            />
                        ) : (
                            <p className="text-gray-800">{event.remark ?? "—"}</p>
                        )}
                    </div>

                    {/* Distanciel / Présentiel */}
                    {event.isRemote ? (
                        <div className="rounded-lg border p-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold text-blue-700">En distanciel</div>
                                {event.meetingSoftware && (
                                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                        {event.meetingSoftware}
                                    </span>
                                )}
                            </div>
                            <div className="text-sm">
                                <span className="text-gray-600">Lien de l&apos;évènement : </span>
                                {event.meetingURL ? (
                                    <a
                                        href={event.meetingURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline break-all"
                                    >
                                        {event.meetingURL}
                                    </a>
                                ) : (
                                    <span className="text-gray-500">Non renseigné</span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-lg border p-4 space-y-1">
                            <div className="text-sm font-semibold text-emerald-700">En présentiel</div>
                            <div className="text-sm text-gray-800">
                                {event.address?.streetNumber ? `${event.address.streetNumber} ` : ""}
                                {event.address?.streetName ?? "Adresse non renseignée"}
                            </div>
                            <div className="text-sm text-gray-800">
                                {(event.address?.zipCode ?? "") + (event.address?.city ? ` ${event.address.city}` : "")}
                            </div>
                            {event.address?.country && <div className="text-sm text-gray-800">{event.address.country}</div>}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                        {!isUpdate && (

                            <button
                                type="button"                           // ← ne soumet jamais
                                onClick={() => setIsUpdate(true)}
                                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                            >
                                Modifier
                            </button>
                        )}

                        {isUpdate && (
                            <button
                                type="submit"                          // ← déclenche onSubmit uniquement ici
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Enregistrer
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200"
                        >
                            Retour
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DetailEvent;
