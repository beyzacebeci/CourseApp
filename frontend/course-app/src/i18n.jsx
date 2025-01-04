import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Dil dosyalarını doğrudan import edebilirsiniz
import translationEN from "./locales/en/translation";
import translationTR from "./locales/tr/translation";

const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
};

const lang = localStorage.getItem("lang") ?? "en";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources, // Dil kaynaklarını buraya ekliyoruz
    fallbackLng: lang,
    detection: {
      lookupLocalStorage: "lang",
    },
  });

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
});

export default i18n;
