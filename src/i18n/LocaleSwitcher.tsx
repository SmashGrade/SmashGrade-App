import { Select, Space } from 'antd';
import { useIntl } from 'react-intl';
import { AvailableLocales } from './Locale.ts';
import { LocaleContextProps } from './ReactIntlProvider.tsx';

function LocaleSwitcher({ setLocale, locale }: Readonly<LocaleContextProps>) {
    const intl = useIntl();

    return (
        <Space wrap>
            <Select
                value={locale}
                style={{ width: 300 }}
                options={[
                    {
                        value: AvailableLocales.German,
                        label: intl.formatMessage({
                            id: 'language.german',
                            defaultMessage: 'Deutsch',
                            description: 'Sprachoption Deutsch',
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
