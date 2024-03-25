// Third-party Imports
import 'server-only'

// Type Imports
import type { Locale } from '../../i18n-config';

const dictionaries: Record<Locale, any> = {
  en: () => import('./dictionaries/en.json').then(module => module.default),
  ru: () => import('./dictionaries/fr.json').then(module => module.default),
//   ua: () => import('@/data/localization/ua.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => locale ? dictionaries[locale]() : dictionaries.en()
