
import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageType = 'en' | 'mr' | 'hi';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>(() => {
    // Try to get from localStorage first
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return (savedLanguage === 'mr' ? 'mr' : savedLanguage === 'hi' ? 'hi' : 'en') as LanguageType;
  });

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  useEffect(() => {
    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
