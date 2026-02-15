import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createDocument, getTemplates } from "../api/document.api";

interface Props {
  type: "cv" | "lettre" | "autre";
}

export default function CreateDocument({ type }: Props) {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [title, setTitle] = useState("");
  const [previewDocument, setPreviewDocument] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<any | null>(null);

  // Charger les templates filtrés par type
  useEffect(() => {
    getTemplates().then((allTemplates) => {
      const filtered = allTemplates.filter((t: any) => t.type === type);
      setTemplates(filtered);
    });
  }, [type]);

  // Initialiser les valeurs du formulaire quand un template est sélectionné
  useEffect(() => {
    if (selectedTemplate) {
      const initialData: Record<string, string> = {};
      Object.keys(selectedTemplate.variables || {}).forEach((key) => {
        initialData[key] = selectedTemplate.variables[key]?.defaultValue || "";
      });
      setFormData(initialData);
      if (!title) setTitle(`Document ${selectedTemplate.name}`);
    }
  }, [selectedTemplate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return alert("Choisis un template");
    if (!title) return alert("Le titre du document est obligatoire");
    setPreviewDocument(true);
  };

  const handleSave = async () => {
    if (!selectedTemplate) return;
    const payload = {
      title,
      type: selectedTemplate?.type || "generic",
      templateId: selectedTemplate?._id,
      content: formData,
    };

    try {
      await createDocument(payload);
      alert(" Document créé avec succès !");
      setPreviewDocument(false);

      // Redirection après création
      if (type === "cv") navigate("/resumes");
      else if (type === "lettre") navigate("/cover-letters");
      else if (type === "autre") navigate("/other-documents");
    } catch (err: any) {
      console.error("Erreur création document :", err.response?.data || err.message);
      alert(" Erreur lors de la création du document");
    }
  };

  const renderHTML = (templateContent: string) => {
    return Object.entries(formData).reduce((html, [key, val]) => {
      return html.replaceAll(`{{${key}}}`, val);
    }, templateContent);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl">
      {/* Bouton Retour en haut */}
      <button
        type="button"
        className="mb-4 text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded transition"
        onClick={() =>
          navigate(type === "cv"
        ? "/resumes"
        : type === "lettre"
        ? "/cover-letters"
        : "/other-documents")
        }
      >
        ← Retour
      </button>

      <h1 className="text-2xl font-bold mb-6">Créer un document</h1>

      {/* Liste des templates */}
      <div className="mb-6">
        <h3 className="mb-2 font-semibold">Choisir un template :</h3>
        <div className="flex flex-col gap-2">
          {templates.map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center p-2 border rounded hover:bg-gray-50"
            >
              <span>{t.name}</span>
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setPreviewTemplate(t)}
                >
                  Prévisualiser
                </button>
                <button
                  className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => setSelectedTemplate(t)}
                >
                  Sélectionner
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formulaire dynamique */}
      {selectedTemplate && (
        <form onSubmit={handleCreateClick} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Titre du document</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Titre du document"
            />
          </div>

          {Object.entries(selectedTemplate.variables || {}).map(
            ([key, variable]: [string, any]) => (
              <div key={key}>
                <label className="block font-semibold mb-1">
                  {variable.label || key}
                </label>
                {variable.type === "string" || variable.type === "number" ? (
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                ) : (
                  <textarea
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                )}
              </div>
            )
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Créer
            </button>
          </div>
        </form>
      )}

      {/* Modal de prévisualisation du template */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
            <h3 className="text-xl font-bold mb-4">{previewTemplate.name}</h3>
            <div className="overflow-auto max-h-[60vh] border p-4">
              <div
                dangerouslySetInnerHTML={{ __html: previewTemplate.content }}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => {
                  setSelectedTemplate(previewTemplate);
                  setPreviewTemplate(null);
                }}
              >
                Sélectionner ce template
              </button>
              <button
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setPreviewTemplate(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de prévisualisation du document */}
      {previewDocument && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative">
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <div className="overflow-auto max-h-[60vh] border p-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: renderHTML(selectedTemplate.content),
                }}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleSave}
              >
                Sauvegarder
              </button>
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => setPreviewDocument(false)}
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
