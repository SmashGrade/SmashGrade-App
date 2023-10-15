import { OnboardingPage } from './pages/OnboardingPage';
import { IntlProvider } from 'react-intl';
import { useState } from 'react';
import { languages, locales } from './i18n/languages.ts';
import LocaleSwitcher from '@components/LocaleSwitcher.tsx';

function App() {
    const defaultLocale = navigator.language ? navigator.language : locales.de;
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
