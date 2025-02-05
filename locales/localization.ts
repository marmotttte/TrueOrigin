import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "./en.json";
import fr from "./fr.json";
import es from "./es.json";

// Load translations from JSON files
const resources = {
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
};

const locales = Localization.getLocales();

// Set language based on locale or fallback to 'en'
const languageCode = locales[0]?.languageCode ? locales[0].languageCode.split('-')[0] : "en";

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: languageCode, // Use detected language code
        fallbackLng: "en", // Default language if translation is missing
        interpolation: {
            escapeValue: false, // React already handles escaping
        },
    });

export default i18next;
