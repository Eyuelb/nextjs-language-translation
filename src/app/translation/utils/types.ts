export type LanguageContent = {
  languages: string[];
};

export interface TranslationPageType {
  language: string;
  translation: Record<string, string>;
}
