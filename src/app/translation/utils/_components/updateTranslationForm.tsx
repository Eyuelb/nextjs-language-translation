import React, { useState } from "react";

interface UpdateTranslationFormProps {
  languages: string[];
  onUpdateTranslation: (language: string, key: string, value: string) => void;
  translations: Record<string, string>;
}

const UpdateTranslationForm: React.FC<UpdateTranslationFormProps> = ({
  languages,
  onUpdateTranslation,
  translations,
}) => {
  const [updateTranslationData, setUpdateTranslationData] = useState({
    language: "",
    key: "",
    value: "",
  });

  const handleUpdateTranslation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateTranslation(
      updateTranslationData.language,
      updateTranslationData.key,
      updateTranslationData.value
    );
    // Optionally, you can clear the form fields
    setUpdateTranslationData({ key: "", value: "", language: "" });
  };

  return (
    <form onSubmit={handleUpdateTranslation} className="px-4 py-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Language to Update:
        <select
          name="updateTranslationLanguage"
          value={updateTranslationData.language}
          onChange={(e) =>
            setUpdateTranslationData({
              ...updateTranslationData,
              language: e.target.value,
            })
          }
          className="border rounded-md px-3 py-2 mt-1 mb-2 focus:outline-none focus:ring focus:border-blue-300"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Translation Key to Update:
        <select
          name="updateTranslationKey"
          value={updateTranslationData.key}
          onChange={(e) =>
            setUpdateTranslationData({
              ...updateTranslationData,
              key: e.target.value,
            })
          }
          className="border rounded-md px-3 py-2 mt-1 mb-2 focus:outline-none focus:ring focus:border-blue-300"
        >
          {/* Fetch translation keys for the selected language */}
          {Object.keys(translations).map((translationKey) => (
            <option key={translationKey} value={translationKey}>
              {translationKey}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        New Translation Value:
        <input
          type="text"
          name="updateTranslationValue"
          placeholder="New Translation Value"
          value={updateTranslationData.value}
          onChange={(e) =>
            setUpdateTranslationData({
              ...updateTranslationData,
              value: e.target.value,
            })
          }
          className="border rounded-md px-3 py-2 mt-1 mb-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </label>
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300"
      >
        Update Translation
      </button>
    </form>
  );
};

export default UpdateTranslationForm;
