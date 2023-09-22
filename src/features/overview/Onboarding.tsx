import styles from './Overview.module.scss';
import { useState } from 'react';
import SelectWithTitle from '../../components/SelectWithTitle.tsx';

const startYears = [
    { value: 2023, label: '2023' },
    { value: 2024, label: '2024' },
    { value: 2025, label: '2025' },
    { value: 2026, label: '2026' },
];

const curriculums = [
    { value: 'Lehrgang 0', label: 'Lehrgang 0', year: 2022 },
    { value: 'Lehrgang 1', label: 'Lehrgang 1', year: 2023 },
    { value: 'Lehrgang 2', label: 'Lehrgang 2', year: 2023 },
    { value: 'Lehrgang 3', label: 'Lehrgang 3', year: 2025 },
    { value: 'Lehrgang 4', label: 'Lehrgang 4', year: 2026 },
];

export default function Onboarding() {
    const [currentYear, setCurrentYear] = useState(startYears[0].value);

    const availableCurriculums = curriculums.filter((curriculum) => curriculum.year === currentYear);

    return (
        <div className={styles.overviewContainer}>
            <h1>Overview</h1>
            <SelectWithTitle
                key={'startYear'}
                title={'Startjahr'}
                selectProps={{ options: startYears, onChange: setCurrentYear }}
            />

            <SelectWithTitle key={'curriculum'} title={'Lehrgang'} selectProps={{ options: availableCurriculums }} />
        </div>
    );
}
