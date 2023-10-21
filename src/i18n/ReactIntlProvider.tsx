import LocaleSwitcher from '@components/LocaleSwitcher.tsx';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { IntlProvider as IntlProviderCustom } from 'react-intl';
import type * as sourceOfTruth from './compiled-lang/de.json';
import { AvailableLocales } from './Locale';

export type LocaleMessages = typeof sourceOfTruth;
export type LocaleKey = keyof LocaleMessages;

async function importMessages(locale: AvailableLocales): Promise<LocaleMessages> {
    switch (locale) {
        case AvailableLocales.English: {
            const enModule = await import('./compiled-lang/en.json');
            return enModule.default;
        }
        case AvailableLocales.German: {
            const deModule = await import('./compiled-lang/de.json');
            return deModule.default;
        }
        case AvailableLocales.French: {
            const frModule = await import('./compiled-lang/fr.json');
            return frModule.default;
        }
        default: {
            const defaultModule = await import('./compiled-lang/de.json');
            return defaultModule.default;
        }
    }
}

const IntlProvider: React.FC<
    Omit<React.ComponentProps<typeof IntlProviderCustom>, 'messages'> & {
        messages: LocaleMessages;
    }
> = (props) => <IntlProviderCustom {...props} />;

function getDefaultLanguage() {
    const userLang = localStorage.getItem('locale') as AvailableLocales;
    if (userLang) {
        return userLang;
    }

    const navLang = navigator.language.split('-')[0] as AvailableLocales;
    if (Object.values(AvailableLocales).includes(navLang)) {
        return navLang;
    }

    return AvailableLocales.German;
}

export function ReactIntlProvider({ children }: PropsWithChildren) {
    const defaultLocale = getDefaultLanguage();
    const [locale, setLocale] = useState(defaultLocale);
    const [messages, setMessages] = useState<LocaleMessages | null>(null);

    useEffect(() => {
        importMessages(locale).then(setMessages).catch(console.error);
    }, [locale]);

    return messages ? (
        <IntlProvider locale={locale} messages={messages} defaultLocale={defaultLocale}>
            <LocaleSwitcher setLocale={setLocale} />
            {children}
        </IntlProvider>
    ) : (
        'Language Loading...'
    );
}
