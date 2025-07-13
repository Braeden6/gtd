import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/assets/translations/en/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: en,
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    ns: ['common'],
    defaultNS: 'common',
  });

export default i18n;

export const { t } = i18n;