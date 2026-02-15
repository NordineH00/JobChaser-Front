import { useState } from 'react';
import { useTemplatesApi } from '../api/template.api';

export default function TemplateCreator() {
  const { createTemplate } = useTemplatesApi();

  const [name, setName] = useState('');
  const [type, setType] = useState<'cv' | 'lettre' | 'autre'>('cv'); // type métier
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('<h1>{{titre}}</h1><p>{{description}}</p>');
  const [variables, setVariables] = useState([
    { key: 'titre', label: 'Titre', type: 'string' },
    { key: 'description', label: 'Description', type: 'string' }
  ]);

  const [previewValues, setPreviewValues] = useState<Record<string, string>>({});
  const [previewHTML, setPreviewHTML] = useState('');

  const handlePreview = () => {
    let rendered = content;
    variables.forEach(v => {
      rendered = rendered.replaceAll(`{{${v.key}}}`, previewValues[v.key] || '');
    });
    setPreviewHTML(rendered);
  };

  const handleSave = async () => {
    const payload = {
      name,
      type, // maintenant c’est le type métier
      content,
      variables: Object.fromEntries(
        variables.map(v => [v.key, { label: v.label, type: v.type }])
      ),
      description,
      createdBy: 'user123', // remplacer par l’utilisateur connecté
    };

    try {
      await createTemplate(payload);
      alert('✅ Template créé avec succès');
    } catch (err) {
      console.error(err);
      alert('❌ Erreur lors de la création du template');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Créer un Template</h2>

      <div className="grid gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Nom du template"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={type}
          onChange={e => setType(e.target.value as 'cv' | 'lettre' | 'autre')}
        >
          <option value="cv">CV</option>
          <option value="lettre">Lettre</option>
          <option value="autre">Autre</option>
        </select>

        <textarea
          className="border p-2 rounded font-mono"
          rows={10}
          placeholder="Contenu HTML avec {{variables}}"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      <h3 className="font-semibold mt-4">Variables</h3>
      {variables.map((v, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            className="border p-1 flex-1"
            placeholder="clé (ex: titre)"
            value={v.key}
            onChange={e => {
              const updated = [...variables];
              updated[i].key = e.target.value;
              setVariables(updated);
            }}
          />
          <input
            className="border p-1 flex-1"
            placeholder="label (ex: Titre du document)"
            value={v.label}
            onChange={e => {
              const updated = [...variables];
              updated[i].label = e.target.value;
              setVariables(updated);
            }}
          />
          <select
            className="border p-1"
            value={v.type}
            onChange={e => {
              const updated = [...variables];
              updated[i].type = e.target.value;
              setVariables(updated);
            }}
          >
            <option value="string">Texte</option>
            <option value="number">Nombre</option>
            <option value="subtemplate">Sous-template</option>
          </select>
        </div>
      ))}

      <button
        onClick={() => setVariables([...variables, { key: '', label: '', type: 'string' }])}
        className="bg-gray-200 p-2 rounded"
      >
        + Ajouter une variable
      </button>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handlePreview}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Prévisualiser
        </button>
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Enregistrer
        </button>
      </div>

      {previewHTML && (
        <div className="mt-6 border p-4 rounded bg-white">
          <h3 className="font-semibold mb-2">Prévisualisation :</h3>
          <div dangerouslySetInnerHTML={{ __html: previewHTML }} />
        </div>
      )}
    </div>
  );
}
