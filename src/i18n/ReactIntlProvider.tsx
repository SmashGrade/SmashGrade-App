import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import type * as sourceOfTruth from './compiled-lang/de.json';
import { AvailableLocales } from './Locale';

export type LocaleMessages = typeof sourceOfTruth;
export type LocaleKey = keyof LocaleMessages;

async function importMessages(locale: AvailableLocales): Promise<LocaleMessages> {
    switch (locale) {
        case AvailableLocales.German: {
            const deModule = await import('./compiled-lang/de.json');
            return deModule.default;
        }
        default: {
            const defaultModule = await import('./compiled-lang/de.json');
            return defaultModule.default;
        }
    }
}

const CustomIntlProvider: React.FC<
    Omit<React.ComponentProps<typeof IntlProvider>, 'messages'> & {
        messages: LocaleMessages;
    }
> = (props) => <IntlProvider {...props} />;

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

export interface LocaleContextProps {
    locale: AvailableLocales;
    setLocale: React.Dispatch<React.SetStateAction<AvailableLocales>>;
}

interface LocaleProviderProps {
    children: ReactNode;
}

export const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export function LocaleProvider({ children }: Readonly<LocaleProviderProps>) {
    const defaultLocale = getDefaultLanguage();
    const [locale, setLocale] = useState(defaultLocale);
    const [messages, setMessages] = useState<LocaleMessages | null>(null);

    useEffect(() => {
        importMessages(locale).then(setMessages).catch(console.error);
    }, [locale]);

    const contextValue: LocaleContextProps = useMemo(() => {
        return {
            locale,
            setLocale,
        };
    }, [locale]);

    return (
        <LocaleContext.Provider value={contextValue}>
            {messages ? (
                <CustomIntlProvider locale={locale} messages={messages} defaultLocale={defaultLocale}>
                    {children}
                </CustomIntlProvider>
            ) : (
                'Language Loading...'
            )}
        </LocaleContext.Provider>
    );
}
