import { useEffect, useState, type MouseEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Star, X } from "lucide-react";
import { getDocuments, updateDocument, deleteDocument } from "../api/document.api";

interface Resume {
  _id: string;
  title: string;
  updatedAt: string;
  isFavorite: boolean;
  rendered: string; // HTML généré
}

export default function Resumes() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<Resume | null>(null);

  // Charger les CV de l'utilisateur
  useEffect(() => {
    setLoading(true);
    getDocuments("cv") // récupère uniquement les CV
      .then((res) => setResumes(res))
      .finally(() => setLoading(false));
  }, []);

  // Gestion des favoris
  const toggleFavorite = async (e: MouseEvent<HTMLButtonElement>, cv: Resume) => {
    e.stopPropagation();

    // Optimistic update côté UI
    const updatedCV = { ...cv, isFavorite: !cv.isFavorite };
    setResumes((prev) =>
      prev.map((r) => (r._id === cv._id ? updatedCV : r))
    );

    try {
      // Appel à l'API principale
      await updateDocument(cv._id, { isFavorite: updatedCV.isFavorite });
    } catch (err) {
      console.error("Erreur mise à jour favori", err);
      // rollback si erreur
      setResumes((prev) =>
        prev.map((r) => (r._id === cv._id ? cv : r))
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Chargement des CV...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
        <div className="p-6 space-y-6 sm:p-8">

          {/* Bouton Retour */}
          <button
            onClick={() => navigate("/documents")} // redirection vers le menu principal
            className="mb-4 text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded transition"
          >
            ← Retour
          </button>

          <h1 className="text-2xl font-bold text-center text-gray-900">
            Mes CV
          </h1>

          <div className="flex flex-col gap-4">
            {resumes.length === 0 ? (
              <p className="text-center text-gray-500">Aucun CV trouvé.</p>
            ) : (
              resumes.map((cv) => (
                <div
                  key={cv._id}
                  onClick={() => setPreview(cv)}
                  className="bg-gray-50 border rounded-lg p-4 hover:shadow transition cursor-pointer flex justify-between items-center"
                >
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {cv.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Dernière modification :{" "}
                      {new Date(cv.updatedAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>

                  <button
                    onClick={(e) => toggleFavorite(e, cv)}
                    className={`ml-3 p-2 rounded-full transition hover:scale-110 ${
                      cv.isFavorite ? "text-yellow-400" : "text-gray-400"
                    }`}
                    title={
                      cv.isFavorite
                        ? "Retirer des favoris"
                        : "Ajouter aux favoris"
                    }
                  >
                    <Star
                      size={22}
                      fill={cv.isFavorite ? "currentColor" : "none"}
                      stroke="currentColor"
                    />
                  </button>
                </div>
              ))
            )}

            <Link
              to="/resume-creation"
              className="w-full text-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 transition"
            >
              + Créer un nouveau CV
            </Link>
          </div>

          <p className="text-sm text-center text-gray-500">
            Retrouvez ici tous vos CV enregistrés et ajoutez vos favoris.
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
              dangerouslySetInnerHTML={{ __html: preview.rendered }}
            />

            {/* Bouton Supprimer */}
            <button
              onClick={async () => {
                if (confirm("Voulez-vous vraiment supprimer ce document ?")) {
                  try {
                    await deleteDocument(preview._id);
                    setResumes((prev) =>
                      prev.filter((doc) => doc._id !== preview._id)
                    );
                    setPreview(null);
                  } catch (err) {
                    console.error("Erreur suppression document :", err);
                    alert(" Impossible de supprimer le document ");
                  }
                }
              }}
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
