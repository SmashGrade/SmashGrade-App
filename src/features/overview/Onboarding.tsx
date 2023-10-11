import SelectWithTitle from '@components/SelectWithTitle.tsx';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import styles from './Overview.module.scss';

interface YearResponse {
    year: number;
}

interface Year {
    value: number;
    label: string;
}

interface CurriculumResponse {
    id: number;
    title: string;
    year: number;
}

interface Curriculum {
    value: string;
    label: string;
    year: number;
}

/*const startYears = [
    { value: 2023, label: '2023' },
    { value: 2024, label: '2024' },
    { value: 2025, label: '2025' },
    { value: 2026, label: '2026' },
];*/

/*const curriculums = [
    { value: 'Lehrgang 0', label: 'Lehrgang 0', year: 2022 },
    { value: 'Lehrgang 1', label: 'Lehrgang 1', year: 2023 },
    { value: 'Lehrgang 2', label: 'Lehrgang 2', year: 2023 },
    { value: 'Lehrgang 3', label: 'Lehrgang 3', year: 2025 },
    { value: 'Lehrgang 4', label: 'Lehrgang 4', year: 2026 },
];*/

async function getYears(): Promise<Year[]> {
    const { data } = await axios.get<YearResponse[]>('http://localhost:3000/startYears');

    const selectOptions: Year[] = [];
    data.forEach((year: YearResponse) => {
        selectOptions.push({ value: year.year, label: year.year.toString() });
    });

    return selectOptions;
}

async function getCurriculums(): Promise<Curriculum[]> {
    const { data } = await axios.get<CurriculumResponse[]>('http://localhost:3000/curriculums');

    const selectOptions: Curriculum[] = [];
    data.forEach((curriculum) => {
        selectOptions.push({ value: curriculum.title, label: curriculum.title, year: curriculum.year });
    });

    return selectOptions;
}

export default function Onboarding() {
    const {
        isLoading: yearsLoading,
        error: yearsError,
        data: yearData,
    } = useQuery({
        queryKey: ['startYears'],
        queryFn: getYears,
    });

    const {
        isLoading: curriculumsLoading,
        error: curriculumsError,
        data: curriculumsData,
    } = useQuery({
        queryKey: ['curriculums'],
        queryFn: getCurriculums,
    });

    const [currentYear, setCurrentYear] = useState(yearData?.length ? yearData[0].value : 0);

    if (yearsLoading || curriculumsLoading) {
        return <h2>Loading</h2>;
    }
    if (yearsError) {
        return <h2>Error while getting years</h2>;
    }

    if (curriculumsError) {
        return <h2>Error while getting curriculums </h2>;
    }

    const availableCurriculums = curriculumsData?.length
        ? curriculumsData.filter((curriculum) => curriculum.year === currentYear)
        : [];

    return (
        <div className={styles.overviewContainer}>
            <h1>Overview</h1>
            <SelectWithTitle
                key={'startYear'}
                title={'Startjahr'}
                selectProps={{ options: yearData, onChange: setCurrentYear }}
            />

            <SelectWithTitle key={'curriculum'} title={'Lehrgang'} selectProps={{ options: availableCurriculums }} />
        </div>
    );
}
