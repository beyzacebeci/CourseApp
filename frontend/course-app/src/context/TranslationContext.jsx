import { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const { t, i18n } = useTranslation();

  const value = {
    t,
    i18n,
    changeLanguage: (lng) => i18n.changeLanguage(lng),
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error(
      "useTranslationContext must be used within a TranslationProvider"
    );
  }
  return context;
};
