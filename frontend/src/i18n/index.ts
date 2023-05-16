import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './translations/en/en.json';
import ptTranslation from './translations/pt/pt.json';

i18n.use(initReactI18next).init({
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources: {
    pt: ptTranslation,
    en: enTranslation,
  }
})

export default i18n;
