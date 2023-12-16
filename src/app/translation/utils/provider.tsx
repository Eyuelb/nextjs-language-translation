"use client";
import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import {
  addLanguage,
  getLanguage,
  addTranslation,
  getTranslations,
  updateTranslation,
} from "./apiService";
import LanguageConfigurationLayout from "./_components/language-configuration-layout";

// Define the types for your context
interface TranslationContextProps {
  language: string;
  translations: Record<string, string>;
  languageList: string[];
  setLanguage: (language: string) => void;
  addLanguage: (language: string) => void;
  addTranslation: (
    language: string,
    translationKey: string,
    value: string
  ) => void;
  getTranslations: (language: string) => void;
  updateTranslation: (
    language: string,
    translationKey: string,
    value: string
  ) => void;
  t: (translationKey: string) => string;
}

// Create the context
const TranslationContext = createContext<TranslationContextProps | undefined>(
  undefined
);

// Create a TranslationProvider component
export const TranslationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("en");
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [languageList, setLanguageList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const languageContent = await getLanguage();
        if (languageContent) {
          const translationData = await getTranslations(language);
          setLanguageList(languageContent.languages);
          setLanguage(languageContent.languages[0]);
          translationData && setTranslations(translationData.translation);
        }
      } catch (error) {
        console.error("Error fetching translation data:", error);
      }
    };

    fetchData();
  }, []); // Fetch translation data when the component mounts

  const contextValue = useMemo(() => {
    return {
      language,
      translations,
      languageList,
      setLanguage: async (newLanguage: string) => {
        setLanguage(newLanguage);
        // Fetch new translations when the language changes
        const translationData = await getTranslations(newLanguage);
        setLanguage(newLanguage);
        translationData && setTranslations(translationData.translation);
      },
      addLanguage: async (newLanguage: string)=>{
        await addLanguage(newLanguage)
        await getLanguage()
      },
      addTranslation: async (
        language: string,
        translationKey: string,
        value: string
      ) => {
        try {
          await addTranslation(language, translationKey, value);
          // Optionally, you can update the local state if needed
        } catch (error) {
          console.error("Error adding translation:", error);
        }
      },
      getTranslations: async (language: string) => {
        try {
          const data = await getTranslations(language);
          // Optionally, you can update the local state if needed
          return data;
        } catch (error) {
          console.error("Error getting translations:", error);
        }
      },
      updateTranslation: async (
        language: string,
        translationKey: string,
        value: string
      ) => {
        try {
          await updateTranslation(language, translationKey, value);
          // Optionally, you can update the local state if needed
        } catch (error) {
          console.error("Error updating translation:", error);
        }
      },
      t: (translationKey: string) => {
        return translations[translationKey] ?? translationKey;
      },
    };
  }, [language, translations, languageList]);

  return (
    <TranslationContext.Provider value={contextValue}>
      <LanguageConfigurationLayout/>
      {children}
    </TranslationContext.Provider>
  );
};

// Define a custom hook for using the TranslationContext
export const useTranslation = (): TranslationContextProps => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  return context;
}