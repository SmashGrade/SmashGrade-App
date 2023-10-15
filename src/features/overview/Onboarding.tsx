import styles from './Overview.module.scss';
import { useState } from 'react';
import SelectWithTitle from '@components/SelectWithTitle.tsx';
import { Button } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';

const startYears = [
    { value: 2023, label: '2023' },
    { value: 2024, label: '2024' },
    { value: 2025, label: '2025' },
    { value: 2026, label: '2026' },
];

const curriculums = [
    { value: 'Lehrgang 0', label: 'Lehrgang 0', year: 2022 },
    { value: 'VZ Systemtechnik - Automation/ICT', label: 'VZ Systemtechnik - Automation/ICT', year: 2023 },
    { value: 'Lehrgang 2', label: 'Lehrgang 2', year: 2023 },
    { value: 'Lehrgang 3', label: 'Lehrgang 3', year: 2025 },
    { value: 'Lehrgang 4', label: 'Lehrgang 4', year: 2026 },
];

export default function Onboarding() {
    const [currentYear, setCurrentYear] = useState(startYears[0].value);

    const availableCurriculums = curriculums.filter((curriculum) => curriculum.year === currentYear);

    const intl = useIntl();

    return (
        <div className={styles.overviewContainer}>
            <h1>
                <FormattedMessage
                    id={'onboarding.title'}
                    defaultMessage={'Overview'}
                    description={'Onboarding title'}
                />
            </h1>
            <SelectWithTitle
                key={'startYear'}
                title={intl.formatMessage({
                    id: 'onboarding.startYear',
                    defaultMessage: 'Start Year',
                    description: 'Onboarding start year',
                })}
                selectProps={{ options: startYears, onChange: setCurrentYear }}
            />

            <SelectWithTitle
                key={'curriculum'}
                title={intl.formatMessage({
                    id: 'onboarding.curriculum',
                    defaultMessage: 'Curriculum',
                    description: 'Onboarding curriculum',
                })}
                selectProps={{ options: availableCurriculums }}
            />

            <Button type={'primary'} icon={<RocketOutlined />}>
                Studium starten
            </Button>
        </div>
    );
}
