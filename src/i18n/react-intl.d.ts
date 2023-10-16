import { Locale } from './languages.ts';

declare global {
    namespace FormatjsIntl {
        interface IntlConfig {
            locale: Locale;
        }
    }
}
