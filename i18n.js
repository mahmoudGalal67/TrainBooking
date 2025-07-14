import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TranslationEn from "./src/locales/en/en.json";
import TranslationAr from "./src/locales/ar/ar.json"
import TranslationRu from "./src/locales/ru/ru.json"
import TranslationZh from "./src/locales/zh/zh.json"


const resources = {
  en: {
    translation: TranslationEn,
  },
  ar: {
    translation: TranslationAr,
  },
  ru: {
    translation: TranslationRu,
  },
  zh: {
    translation: TranslationZh,
  },
};

const setDirection = (lang) => {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
};

const loadLanguageFromLocalStorage = () => {
  const storedLanguage = localStorage.getItem('userLanguage');
  return storedLanguage || 'en';
};

const saveLanguageToLocalStorage = (lang) => {
  localStorage.setItem('userLanguage', lang);
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: loadLanguageFromLocalStorage(),
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

i18n.on('languageChanged', (lang) => {
  setDirection(lang);
  saveLanguageToLocalStorage(lang); 
});

setDirection(i18n.language); 

export default i18n;