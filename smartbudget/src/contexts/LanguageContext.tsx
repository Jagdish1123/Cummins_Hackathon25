import React, { createContext, useContext, useState, useEffect } from "react";

// Import translations
import enTranslations from "../translations/en.json";
import hiTranslations from "../translations/hi.json";
import mrTranslations from "../translations/mr.json";

// Supported languages
export type Language = "en" | "hi" | "mr";

// Translation records
const translations: Record<Language, Record<string, string>> = {
  en: enTranslations,
  hi: hiTranslations,
  mr: mrTranslations,
};

// Context type
type LanguageContextType = {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Get initial language from localStorage or default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage && ["en", "hi", "mr"].includes(savedLanguage)
      ? savedLanguage
      : "en";
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  // Function to change language
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  // Translation function
  const t = (key: string, params?: Record<string, string | number>): string => {
    try {
      // Try to find the key in the current language
      if (translations[language][key]) {
        let translatedText = translations[language][key];

        // Replace parameters if provided
        if (params) {
          Object.entries(params).forEach(([paramKey, value]) => {
            translatedText = translatedText.replace(
              `{{${paramKey}}}`,
              String(value)
            );
          });
        }

        return translatedText;
      }

      // Try to find it in English as fallback
      if (language !== "en" && translations["en"][key]) {
        console.warn(
          `Missing translation for key "${key}" in language "${language}"`
        );
        let translatedText = translations["en"][key];

        // Replace parameters if provided
        if (params) {
          Object.entries(params).forEach(([paramKey, value]) => {
            translatedText = translatedText.replace(
              `{{${paramKey}}}`,
              String(value)
            );
          });
        }

        return translatedText;
      }

      // If key not found, return the key itself
      console.warn(`Translation key not found: "${key}"`);
      return key;
    } catch (error) {
      console.error("Translation error:", error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
