import React from "react";

interface FetchTranslationsFormProps {
  onFetchTranslations: () => void;
}

const FetchTranslationsForm: React.FC<FetchTranslationsFormProps> = ({
  onFetchTranslations,
}) => {
  return (
    <div className="px-4 py-2">
      <button
        onClick={onFetchTranslations}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
      >
        Fetch Translations
      </button>
    </div>
  );
};

export default FetchTranslationsForm;
