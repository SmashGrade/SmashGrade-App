import { Select, Space } from 'antd';
import { useIntl } from 'react-intl';
import { AvailableLocales } from '../i18n/Locale.ts';

interface LocaleSwitcherProps {
    setLocale: (locale: AvailableLocales) => void;
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
                        value: AvailableLocales.German,
                        label: intl.formatMessage({
                            id: 'app.locale.de',
                            defaultMessage: 'German',
                        }),
                    },
                    {
                        value: AvailableLocales.English,
                        label: intl.formatMessage({ id: 'app.locale.en', defaultMessage: 'English' }),
                    },
                    {
                        value: AvailableLocales.French,
                        label: intl.formatMessage({ id: 'app.locale.fr', defaultMessage: 'French' }),
                    },
                ]}
                onSelect={(val) => setLocale(val)}
            />
        </Space>
    );
}

export default LocaleSwitcher;
