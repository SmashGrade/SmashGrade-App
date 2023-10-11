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
