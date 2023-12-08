import Onboarding from '@features/overview/Onboarding.tsx';
import { UserProfile } from '@features/profile/UserProfile.tsx';
import { Card, Select, Space, List } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useLocale } from '@hooks/useLocale.ts';
import LocaleSwitcher from '../../i18n/LocaleSwitcher.tsx';
import { FormattedMessage } from 'react-intl';
import useUserRoles from '@hooks/useUserRoles.ts';

import styles from './Settings.module.scss';

/*
interface UserResponse {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    curriculum?: {
        id: number;
        name: string;
        year: number;
    };
    department?: string;
}

 */

export default function Settings() {
    const { locale, setLocale } = useLocale();
    const userRoles = useUserRoles();

    return (
        <div className={styles.settingsContainer}>
            <Space direction={'vertical'} size={'middle'} style={{ display: 'flex' }}>
                <Title level={1}>
                    <FormattedMessage
                        id={'settings.title'}
                        defaultMessage={'Einstellungen'}
                        description={'Einstellungen Titel'}
                    />
                </Title>
                <UserProfile />
                <Card size={'small'} loading={false} bordered={true} style={{ width: 350 }}>
                    <div className={styles.settingsPersonaRow}>
                        <p>
                            <b>Max Müller</b>
                        </p>
                        <p>{userRoles?.[0]}</p>
                    </div>
                    <p>max.mueller@hftm.ch</p>
                </Card>
                <div className={styles.selectWithTitleContainer}>
                    <div className={styles.title}>Sprache</div>

                    <LocaleSwitcher setLocale={setLocale} locale={locale} />
                </div>
                <Onboarding isReadonly={true} />
                Meine Module
                <Select />
                <List />
            </Space>
        </div>
    );
}
