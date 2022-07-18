import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import HttpApi from "i18next-http-backend"

import de from "./locales/de/translation"
import en from "./locales/en/translation"
import i18next from "i18next"

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    supportedLngs: ["en", "de"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage"],
      caches: ["cookie"],
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
      lookupLocalStorage: "i18nextLng",
    },
    resources: { en: { translation: en }, de: { translation: de } },
    // backend: {
    //   // loadPath: '/assets/locales/{{lng}}/translation.json'
    //   loadPath: "./locales/{{lng}}/translation.json",
    // },
    react: {
      useSuspense: false,
    },
    //saveMissing: true
  })

export default i18next
