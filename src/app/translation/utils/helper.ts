import { promises as fs } from "fs";
import { TranslationPageType } from "./types";
import {
  TRANSLATION_DIR,
  existsTranslationInfo,
  infoFilePath,
} from "./useTranslation";

export async function existsSyncTranslationFile(
  filePath: string,
  language?: string
): Promise<TranslationPageType | null> {
  try {
    // Try to read the file
    const fileContent = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (readError: any) {
    // If reading fails, assume the file doesn't exist
    if (readError.code === "ENOENT") {
      try {
        console.log("File does not exist");
        const defaultTranslation = await getDefaultTranslationKey(
          language ?? "en"
        );
        // File doesn't exist, create it
        await fs.writeFile(
          filePath,
          JSON.stringify(defaultTranslation),
          "utf8"
        );
        const fileContent = await fs.readFile(filePath, "utf8");

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
export const updateTranslationByKey = (
  state: TranslationPageType,
  translationKey: string,
  value: string
): TranslationPageType => {
  return {
    language: state.language,
    translation: Object.entries(state.translation).reduce((acc, [k, val]) => {
      translationKey === k ? (acc[translationKey] = value) : (acc[k] = val);
      return acc;
    }, {} as Record<string, string>),
  };
};

export const getDefaultTranslationKey = async (
  newLanguage: string
): Promise<TranslationPageType | null> => {
  const filePath = `${TRANSLATION_DIR}en.json`;
  let state = await existsSyncTranslationFile(filePath);
  if (state) {
    return {
      language: newLanguage,
      translation: Object.entries(state.translation).reduce((acc, [k, val]) => {
        acc[k] = "";
        return acc;
      }, {} as Record<string, string>),
    };
  }
  return null;
};

export const addLanguageToInfo = async (language: string) => {
  const info = await existsTranslationInfo();

  // Check if the language is already in the languages array
  if (info?.languages.includes(language)) {
    console.log(`Language ${language} already exists.`);
    return;
  }

  // Add the new language to the languages array
  info?.languages.push(language);

  try {
    // Update the info.json file with the new languages array
    await fs.writeFile(infoFilePath, JSON.stringify(info, null, 2), "utf8");
    console.log(`Language ${language} added successfully.`);
  } catch (error) {
    console.error("Error writing info.json:", error);
  }
};
