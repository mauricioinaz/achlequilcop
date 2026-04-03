import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import es from './locales/es'
import tseltal from './locales/tseltal'

export const LANGUAGE_KEY = '@achlequilcop/language'

export type AppLanguage = 'castellano' | 'tseltal'

i18n.use(initReactI18next).init({
  resources: {
    castellano: { translation: es },
    tseltal: { translation: tseltal },
  },
  lng: 'castellano',
  fallbackLng: 'castellano',
  // Treat empty strings as missing so they fall back to Spanish
  returnEmptyString: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
