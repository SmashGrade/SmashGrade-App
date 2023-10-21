import { AvailableLocales } from './Locale.ts';
import { LocaleKey } from './ReactIntlProvider.tsx';

declare global {
    namespace FormatjsIntl {
        interface IntlConfig {
            locale: AvailableLocales;
        }
    }
}

declare global {
    namespace FormatjsIntl {
        interface Message {
            ids: LocaleKey;
        }
    }
}
