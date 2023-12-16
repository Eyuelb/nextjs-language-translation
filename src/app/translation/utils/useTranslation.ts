import { promises as fs } from "fs";
import { LanguageContent, TranslationPageType } from "./types";
import {
  addLanguageToInfo,
  existsSyncTranslationFile,
  updateTranslationByKey,
} from "./helper";
export const TRANSLATION_DIR =
  process.cwd() + "/src/app/translation/language-json/";
export const infoFilePath = `${TRANSLATION_DIR}info.json`;

export const getLanguage = async (): Promise<LanguageContent | null> => {
  const languages = await existsTranslationInfo();
  return languages;
};
export const getTranslations = async (language: string) => {
  const translation = await existsSyncTranslationFile(
    `${TRANSLATION_DIR}${language}.json`
  );

  return translation;
};

export const addTranslation = async (
  language: string,
  translationKey: string,
  value: string
) => {
  const info = await existsTranslationInfo();
  info?.languages.forEach(async (lang) => {
    console.log(lang);

    const filePath = `${TRANSLATION_DIR}${lang}.json`;
    let state = await existsSyncTranslationFile(filePath);
    if (state) {
      const translations: TranslationPageType = {
        ...state,
        translation: {
          ...state.translation,
          [translationKey]: lang === language ? value : "",
        },
      };
      await fs.writeFile(
        filePath,
        JSON.stringify(translations, null, 2),
        "utf8"
      );
    }
  });
};

export const updateTranslation = async (
  language: string,
  translationKey: string,
  value: string
) => {
  const filePath = `${TRANSLATION_DIR}${language}.json`;
  let state = await existsSyncTranslationFile(filePath);
  if (state) {
    const translations = updateTranslationByKey(state, translationKey, value);
    await fs.writeFile(filePath, JSON.stringify(translations, null, 2), "utf8");
  }
};

export const deleteTranslationService = async (translationKey: string) => {
  const info = await existsTranslationInfo();
  info?.languages.forEach(async (lang) => {
    console.log(lang);

    const filePath = `${TRANSLATION_DIR}${lang}.json`;
    let state = await existsSyncTranslationFile(filePath);
    if (state) {
      const translations: TranslationPageType = {
        language: state.language,
        translation: Object.entries(state.translation).reduce(
          (acc, [k, val]) => {
            if (translationKey === k) {
              // Handle the case when key matches
              // You can add your logic here if needed
            } else {
              acc[k] = val;
            }
            return acc;
          },
          {} as Record<string, string>
        ),
      };
      await fs.writeFile(
        filePath,
        JSON.stringify(translations, null, 2),
        "utf8"
      );
    }
  });
};

export const addLanguage = async (language: string) => {
  const info = await existsTranslationInfo();
  const filePath = `${TRANSLATION_DIR}${language}.json`;
  const newLanguage = await existsSyncTranslationFile(filePath, language);
  const updatedInfo = await addLanguageToInfo(language);
};

export async function existsTranslationInfo(): Promise<LanguageContent | null> {
  const defaultInfoContent: LanguageContent = { languages: ["en"] };

  try {
    // Try to read the file
    const fileContent = await fs.readFile(infoFilePath, "utf8");
    return JSON.parse(fileContent);
  } catch (readError: any) {
    // If reading fails, assume the file doesn't exist
    if (readError.code === "ENOENT") {
      try {
        // File doesn't exist, create it
        await fs.writeFile(
          infoFilePath,
          JSON.stringify(defaultInfoContent, null, 2),
          "utf8"
        );
        const fileContent = await fs.readFile(infoFilePath, "utf8");

        console.log("info.json created with default content.", fileContent);
        return JSON.parse(fileContent);
      } catch (writeError) {
        // Handle error while writing
        console.error("Error writing info.json:", writeError);
        return null; // Re-throw the error to indicate failure
      }
    } else {
      // Handle other errors during reading
      console.error("Error reading info.json:", readError);
      return null; // Re-throw the error to indicate failure
    }
  }
}
