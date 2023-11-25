import { useContext } from 'react';
import { LocaleContext } from '../i18n/ReactIntlProvider.tsx';

export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
}
