import { useEffect, useState, type MouseEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Star, X } from "lucide-react";
import { getDocuments, updateDocument, deleteDocument } from "../api/document.api";

interface CoverLetter {
  _id: string;
  title: string;
  updatedAt: string;
  isFavorite: boolean;
  rendered: string; // HTML généré
}

export default function CoverLetters() {
  const navigate = useNavigate();
  const [letters, setLetters] = useState<CoverLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<CoverLetter | null>(null);

  // Charger les lettres de l'utilisateur
  useEffect(() => {
    setLoading(true);
    getDocuments("lettre") // récupère uniquement les lettres
      .then((res) => setLetters(res))
      .finally(() => setLoading(false));
  }, []);

  // Gestion des favoris
  const toggleFavorite = async (e: MouseEvent<HTMLButtonElement>, letter: CoverLetter) => {
    e.stopPropagation();

    const updatedLetter = { ...letter, isFavorite: !letter.isFavorite };
    setLetters((prev) =>
      prev.map((l) => (l._id === letter._id ? updatedLetter : l))
    );

    try {
      await updateDocument(letter._id, { isFavorite: updatedLetter.isFavorite });
    } catch (err) {
      console.error("Erreur mise à jour favori", err);
      // rollback si erreur
      setLetters((prev) =>
        prev.map((l) => (l._id === letter._id ? letter : l))
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Chargement des lettres...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
        <div className="p-6 space-y-6 sm:p-8">
          {/* Bouton Retour */}
          <button
            onClick={() => navigate('/documents')} // retourne à la page précédente
            className="mb-4 text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded transition"
          >
            ← Retour
          </button>

          <h1 className="text-2xl font-bold text-center text-gray-900">
            Mes Lettres
          </h1>

          <div className="flex flex-col gap-4">
            {letters.length === 0 ? (
              <p className="text-center text-gray-500">Aucune lettre trouvée.</p>
            ) : (
              letters.map((letter) => (
                <div
                  key={letter._id}
                  onClick={() => setPreview(letter)}
                  className="bg-gray-50 border rounded-lg p-4 hover:shadow transition cursor-pointer flex justify-between items-center"
                >
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {letter.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Dernière modification :{" "}
                      {new Date(letter.updatedAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>

                  <button
                    onClick={(e) => toggleFavorite(e, letter)}
                    className={`ml-3 p-2 rounded-full transition hover:scale-110 ${
                      letter.isFavorite ? "text-yellow-400" : "text-gray-400"
                    }`}
                    title={
                      letter.isFavorite
                        ? "Retirer des favoris"
                        : "Ajouter aux favoris"
                    }
                  >
                    <Star
                      size={22}
                      fill={letter.isFavorite ? "currentColor" : "none"}
                      stroke="currentColor"
                    />
                  </button>
                </div>
              ))
            )}

            <Link
              to="/letter-creation"
              className="w-full text-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 transition"
            >
              + Créer une nouvelle lettre
            </Link>
          </div>

          <p className="text-sm text-center text-gray-500">
            Retrouvez ici toutes vos lettres enregistrées et ajoutez vos favoris.
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
                if (confirm("Voulez-vous vraiment supprimer cette lettre ?")) {
                  try {
                    await deleteDocument(preview._id);
                    setLetters((prev) =>
                      prev.filter((doc) => doc._id !== preview._id)
                    );
                    setPreview(null);
                  } catch (err) {
                    console.error("Erreur suppression lettre :", err);
                    alert("❌ Impossible de supprimer la lettre");
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
