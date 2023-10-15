import de from './compiled-lang/de.json';
import en from './compiled-lang/en.json';
import fr from './compiled-lang/fr.json';

export const locales: Record<string, string> = {
    de: 'de',
    en: 'en',
    fr: 'fr',
};

export const languages: Record<string, Record<string, string>> = {
    de: de,
    en: en,
    fr: fr,
};
