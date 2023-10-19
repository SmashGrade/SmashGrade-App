import { RocketOutlined } from '@ant-design/icons';
import SelectWithTitle from '@components/SelectWithTitle.tsx';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styles from './Overview.module.scss';

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

    useEffect(() => {
        fetch('/startYears')
            .then((response) => response.json())
            .then((data) => {
                console.info(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <div className={styles.overviewContainer}>
            <h1>
                <FormattedMessage
                    id={'onboarding.title'}
                    defaultMessage={'Übersicht'}
                    description={'Übersicht Titel'}
                />
            </h1>
            <SelectWithTitle
                key={'startYear'}
                title={intl.formatMessage({
                    id: 'startYear',
                    defaultMessage: 'Startjahr',
                    description: 'Startjahr Dropdown Titel',
                })}
                selectProps={{ options: startYears, onChange: setCurrentYear }}
            />

            <SelectWithTitle
                key={'curriculum'}
                title={intl.formatMessage({
                    id: 'curriculum',
                    defaultMessage: 'Lehrplan',
                    description: 'Lehrplan Dropdown Titel',
                })}
                selectProps={{ options: availableCurriculums }}
            />

            <Button type={'primary'} icon={<RocketOutlined />}>
                Studium starten
            </Button>
        </div>
    );
}
