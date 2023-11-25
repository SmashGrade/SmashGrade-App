import LocaleSwitcher from '@components/LocaleSwitcher.tsx';
import { Card } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useLocale } from '../../hooks/useLocale.ts';

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
    return (
        <div className={styles.settingsContainer}>
            <LocaleSwitcher setLocale={setLocale} locale={locale} />
            <Title level={1}> Einstellungen</Title>
            <Card size={'small'} loading={false} bordered={true} style={{ width: 350 }}>
                <div className={styles.settingsPersonaRow}>
                    <p>
                        <b>Max Müller</b>
                    </p>
                    <p>Fachbereichsleiter:in</p>
                </div>
                <p>max.mueller@hftm.ch</p>
            </Card>
        </div>
    );
}
