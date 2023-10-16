import { Select, Space } from 'antd';
import { useIntl } from 'react-intl';
import { Locale, locales } from '../i18n/languages';

interface LocaleSwitcherProps {
    setLocale: (locale: Locale) => void;
}

function LocaleSwitcher({ setLocale }: LocaleSwitcherProps) {
    const intl = useIntl();

    return (
        <Space wrap>
            <Select
                value={intl.locale}
                style={{ width: 120 }}
                bordered={false}
                options={[
                    {
                        value: locales.de,
                        label: intl.formatMessage({
                            id: 'app.locale.de',
                            defaultMessage: 'Deutsch',
                        }),
                    },
                    {
                        value: locales.en,
                        label: intl.formatMessage({ id: 'app.locale.en', defaultMessage: 'Englisch' }),
                    },
                    {
                        value: locales.fr,
                        label: intl.formatMessage({ id: 'app.locale.fr', defaultMessage: 'Französisch' }),
                    },
                ]}
                onSelect={(val) => setLocale(val)}
            />
        </Space>
    );
}

export default LocaleSwitcher;
