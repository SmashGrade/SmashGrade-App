import de from './compiled-lang/de.json';
import en from './compiled-lang/en.json';
import fr from './compiled-lang/fr.json';

export type Locale = 'de' | 'en' | 'fr';
export const locales: Record<Locale, Locale> = {
    de: 'de',
    en: 'en',
    fr: 'fr',
};

export const languages: Record<Locale, Record<string, string>> = {
    de: de,
    en: en,
    fr: fr,
};
