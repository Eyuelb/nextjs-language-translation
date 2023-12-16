import React, { useState } from "react";
import AddTranslationForm from "./addTranslationForm";
import FetchTranslationsForm from "./fetchTranslationsForm";
import UpdateTranslationForm from "./updateTranslationForm";
import { useTranslation } from "../provider";
import AddLanguageForm from "./addLanguageForm";

function LanguageConfigurationLayout() {
  const {
    language,
    languageList,
    setLanguage,
    translations,
    addTranslation,
    addLanguage,
    getTranslations,
    updateTranslation,
  } = useTranslation();

  const [accordionOpen, setAccordionOpen] = useState("addTranslation");

  const handleAccordionClick = (accordionId: string) => {
    accordionOpen == accordionId
      ? setAccordionOpen("")
      : setAccordionOpen(accordionId);
  };

  const handleAddTranslation = (key: string, value: string) => {
    addTranslation(language, key, value);
  };
  const handleAddLanguage = (language: string) => {
    addLanguage(language);
  };
  const handleFetchTranslations = () => {
    getTranslations(language);
  };

  const handleUpdateTranslation = (languageToUpdate: string, key: string, value: string) => {
    updateTranslation(languageToUpdate, key, value);
  };

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-64 px-2.5 shadow-lg transition-transform duration-300 translate-x-0 bg-gray}`}
      style={{  }}
    >
      <div className="flex flex-col">
        <p>Current Language: {language}</p>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {languageList.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        

        {/* Accordion */}
        <div className="mt-4">
                    {/* Add Translation */}
                    <div
            className={`mb-2 p-2 rounded-sm cursor-pointer bg-gray-300 ${
              accordionOpen === "addLanguage" && "bg-gray-400"
            }`}
            onClick={() => handleAccordionClick("addLanguage")}
          >
            Add Language
          </div>
          {accordionOpen === "addLanguage" && (
            <AddLanguageForm onAddLanguage={handleAddLanguage} />
          )}
          {/* Add Translation */}
          <div
            className={`mb-2 p-2 rounded-sm cursor-pointer bg-gray-300 ${
              accordionOpen === "addTranslation" && "bg-gray-400"
            }`}
            onClick={() => handleAccordionClick("addTranslation")}
          >
            Add Translation
          </div>
          {accordionOpen === "addTranslation" && (
            <AddTranslationForm onSubmit={handleAddTranslation} />
          )}

          {/* Fetch Translations */}
          <div
            className={`mb-2 p-2 cursor-pointer bg-gray-300 ${
              accordionOpen === "fetchTranslations" && "bg-gray-400"
            }`}
            onClick={() => handleAccordionClick("fetchTranslations")}
          >
            Fetch Translations
          </div>
          {accordionOpen === "fetchTranslations" && (
            <FetchTranslationsForm onFetchTranslations={handleFetchTranslations} />
          )}

          {/* Update Translation */}
          <div
            className={`mb-2 p-2 cursor-pointer bg-gray-300 ${
              accordionOpen === "updateTranslation" && "bg-gray-400"
            }`}
            onClick={() => handleAccordionClick("updateTranslation")}
          >
            Update Translation
          </div>
          {accordionOpen === "updateTranslation" && (
            <UpdateTranslationForm
              languages={languageList}
              translations={translations}
              onUpdateTranslation={handleUpdateTranslation}
            />
          )}
        </div>
      </div>
    </aside>
  );
}

export default LanguageConfigurationLayout;
