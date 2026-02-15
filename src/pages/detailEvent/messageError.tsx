export const ErrorAllEvent = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 text-center">
                <p className="text-gray-600">Aucun évènement disponible</p>
            </div>
        </div>
    );
}

export const ErrorOneEvent = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 text-center">
                <p className="text-gray-600">L&apos;évènement est introuvable</p>
            </div>
        </div>
    );
}