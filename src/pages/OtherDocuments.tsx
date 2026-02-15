import { useEffect, useState, type MouseEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Star, X } from "lucide-react";
import { getDocuments, updateDocument, deleteDocument } from "../api/document.api";

interface OtherDocument {
  _id: string;
  title: string;
  updatedAt: string;
  isFavorite: boolean;
  rendered?: string; // Optionnel si tu veux prévisualiser du HTML
}

export default function OtherDocuments() {
  const [documents, setDocuments] = useState<OtherDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<OtherDocument | null>(null);
  const navigate = useNavigate();

  // Charger les documents "autre" depuis l'API
  useEffect(() => {
    setLoading(true);
    getDocuments("autre")
      .then((res) => setDocuments(res))
      .finally(() => setLoading(false));
  }, []);

  // Gestion des favoris
  const toggleFavorite = async (e: MouseEvent<HTMLButtonElement>, doc: OtherDocument) => {
    e.stopPropagation();
    const updatedDoc = { ...doc, isFavorite: !doc.isFavorite };
    setDocuments((prev) =>
      prev.map((d) => (d._id === doc._id ? updatedDoc : d))
    );

    try {
      await updateDocument(doc._id, { isFavorite: updatedDoc.isFavorite });
    } catch (err) {
      console.error("Erreur mise à jour favori", err);
      setDocuments((prev) =>
        prev.map((d) => (d._id === doc._id ? doc : d))
      );
    }
  };

  // Supprimer un document
  const handleDelete = async (doc: OtherDocument) => {
    if (!confirm("Voulez-vous vraiment supprimer ce document ?")) return;

    try {
      await deleteDocument(doc._id);
      setDocuments((prev) => prev.filter((d) => d._id !== doc._id));
      setPreview(null);
    } catch (err) {
      console.error("Erreur suppression document :", err);
      alert("Impossible de supprimer le document");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Chargement des documents...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
        <div className="p-6 space-y-6 sm:p-8">

          {/* Bouton Retour */}
          <button
            onClick={() => navigate("/documents")}
            className="mb-4 text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded transition"
          >
            ← Retour
          </button>

          <h1 className="text-2xl font-bold text-center text-gray-900">
            Autres documents
          </h1>

          <div className="flex flex-col gap-4">
            {documents.length === 0 ? (
              <p className="text-center text-gray-500">Aucun document trouvé.</p>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc._id}
                  onClick={() => setPreview(doc)}
                  className="bg-gray-50 border rounded-lg p-4 hover:shadow transition cursor-pointer flex justify-between items-center"
                >
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">{doc.title}</h2>
                    <p className="text-sm text-gray-500">
                      Dernière modification : {new Date(doc.updatedAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>

                  <button
                    onClick={(e) => toggleFavorite(e, doc)}
                    className={`ml-3 p-2 rounded-full transition hover:scale-110 ${
                      doc.isFavorite ? "text-yellow-400" : "text-gray-400"
                    }`}
                    title={doc.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                  >
                    <Star
                      size={22}
                      fill={doc.isFavorite ? "currentColor" : "none"}
                      stroke="currentColor"
                    />
                  </button>
                </div>
              ))
            )}

            <Link
              to="/other-creation"
              className="w-full text-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 transition"
            >
              + Ajouter un document
            </Link>
          </div>

          <p className="text-sm text-center text-gray-500">
            Gérez ici vos autres documents personnels et marquez vos favoris.
          </p>
        </div>
      </div>

      {/* Modal de prévisualisation */}
      {preview && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-3xl p-6 relative">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 p-2 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">{preview.title}</h2>
            <div
              className="overflow-auto max-h-[70vh] p-4 border rounded"
              dangerouslySetInnerHTML={{ __html: preview.rendered || "" }}
            />

            {/* Bouton Supprimer */}
            <button
              onClick={() => handleDelete(preview)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
