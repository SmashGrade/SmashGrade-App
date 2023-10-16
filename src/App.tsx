import LocaleSwitcher from '@components/LocaleSwitcher.tsx';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { languages, Locale, locales } from './i18n/languages.ts';
import { OnboardingPage } from './pages/OnboardingPage';

function App() {
    const defaultLocale: Locale = (navigator.language as Locale) ?? locales.de;
    const [locale, setLocale] = useState(defaultLocale);
    const messages = languages[locale];

    return (
        <IntlProvider locale={locale} messages={messages} defaultLocale={defaultLocale}>
            <LocaleSwitcher setLocale={setLocale} />
            <OnboardingPage />
        </IntlProvider>
    );
}

export default App;
