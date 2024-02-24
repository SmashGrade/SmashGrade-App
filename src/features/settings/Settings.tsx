import { Spinner } from '@components/ui-elements/Spinner.tsx';
import Onboarding from '@features/overview/Onboarding.tsx';
import { useLocale } from '@hooks/useLocale.ts';
import { useUserProfile } from '@hooks/useUserProfile.ts';
import useUserRoles, { UserRoles } from '@hooks/useUserRoles.ts';
import { Card, List, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { FormattedMessage } from 'react-intl';
import LocaleSwitcher from '../../i18n/LocaleSwitcher.tsx';

import styles from './Settings.module.scss';

export default function Settings() {
    const { locale, setLocale } = useLocale();
    const userRoles = useUserRoles();
    const { userProfile, isLoading, error } = useUserProfile();

    if (isLoading) return <Spinner />;
    // Todo Settings: implement error handling
    if (error) return <p>Fehler beim Laden des Benutzerprofils</p>;

    const isStudent = userRoles?.includes(UserRoles.Student);

    return (
        <div className={styles.settingsContainer}>
            <Title level={1}>
                <FormattedMessage
                    id={'settings.title'}
                    defaultMessage={'Einstellungen'}
                    description={'Einstellungen Titel'}
                />
            </Title>
            <Space direction={'vertical'} size={'middle'} style={{ display: 'flex' }}>
                <Card size={'small'} loading={false} bordered={true} style={{ width: 350 }}>
                    <div className={styles.settingsPersonaRow}>
                        <p>{userProfile?.displayName}</p>
                        <p>{userRoles?.[0]}</p>
                    </div>
                    <p>{userProfile?.mail}</p>
                </Card>
                <div className={styles.selectWithTitleContainer}>
                    <div className={styles.title}>
                        <FormattedMessage
                            id={'settings.language'}
                            defaultMessage={'Sprache'}
                            description={'Sprachoption'}
                        />
                    </div>

                    <LocaleSwitcher setLocale={setLocale} locale={locale} />
                </div>
                {isStudent && (
                    <>
                        <Onboarding isReadonly={true} />
                        <FormattedMessage
                            id={'settings.myModules'}
                            defaultMessage={'Meine Module'}
                            description={'Meine Module'}
                        />
                        <List />
                    </>
                )}
            </Space>
        </div>
    );
}
