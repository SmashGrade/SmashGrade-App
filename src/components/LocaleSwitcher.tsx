import { Select, Space } from 'antd';
import { useIntl } from 'react-intl';
import { AvailableLocales } from '../i18n/Locale.ts';

interface LocaleSwitcherProps {
    setLocale: (locale: AvailableLocales) => void;
}

function LocaleSwitcher({ setLocale }: Readonly<LocaleSwitcherProps>) {
    const intl = useIntl();

    return (
        <Space wrap>
            <Select
                value={intl.locale}
                style={{ width: 120 }}
                bordered={false}
                options={[
                    {
                        value: AvailableLocales.German,
                        label: intl.formatMessage({
                            id: 'language.german',
                            defaultMessage: 'Deutsch',
                            description: 'Sprachoption Deutsch',
                        }),
                    },
                    {
                        value: AvailableLocales.English,
                        label: intl.formatMessage({
                            id: 'language.english',
                            defaultMessage: 'Englisch',
                            description: 'Sprachoption Englisch',
                        }),
                    },
                    {
                        value: AvailableLocales.French,
                        label: intl.formatMessage({
                            id: 'language.french',
                            defaultMessage: 'Französisch',
                            description: 'Sprachoption Französisch',
                        }),
                    },
                ]}
                onSelect={(val) => {
                    setLocale(val);
                    localStorage.setItem('locale', val);
                }}
            />
        </Space>
    );
}

export default LocaleSwitcher;
