import { createContext, useContext, useState } from "react";

import en from "../translations/en";
import te from "../translations/te";
import hi from "../translations/hi";

const LanguageContext = createContext(null);

const translations = {
  en,
  te,
  hi,
};

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  function changeLanguage(newLanguage) {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  }

  function t(key) {
    return translations[language]?.[key] || translations.en[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  return useContext(LanguageContext);
}

export default LanguageProvider;