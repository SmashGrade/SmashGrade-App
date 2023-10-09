import { useQuery } from '@tanstack/react-query';
import styles from './Overview.module.scss';
import { useState } from 'react';
import SelectWithTitle from '@components/SelectWithTitle.tsx';

interface YearResponse {
    year: number
}

interface Year {
    value: number,
    label: string
}

interface CurriculumResponse {
    id: number,
    title: string,
    year: number
}

interface Curriculum {
    value: string,
    label: string,
    year: number
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

async function getYears() : Promise<Year[]> {
    return await fetch("http://localhost:3000/startYears")
        .then( data => data.json() )
        .then( (years : YearResponse[]) => {
            const selectOptions : Year[] = [];
            years.forEach(year => {
                selectOptions.push( { value: year.year, label: year.year as string } )
            })

            return selectOptions;
        })
}

async function getCurriculums() : Promise<Curriculum[]> {
    return await fetch("http://localhost:3000/curriculums")
        .then( data => data.json() )
        .then( (curriculums : CurriculumResponse[]) => {
            const selectOptions : Curriculum[] = [];
            curriculums.forEach(curriculum => {
                selectOptions.push( { value: curriculum.title, label: curriculum.title, year: curriculum.year } )
            })

            return selectOptions;
        })
}

export default function Onboarding() {
    const yearQuery = useQuery({
        queryKey: ['startYears'],
        queryFn: getYears
    });

    const curriculumQuery = useQuery({
        queryKey: ['curriculums'],
        queryFn: getCurriculums
    })

    const [currentYear, setCurrentYear] = useState(yearQuery.data && yearQuery.data.length > 0 ? yearQuery.data[0].value : 0);

    if( yearQuery.status === "loading" || curriculumQuery.status === "loading" ) {
        return <h2>Loading</h2>;

    }
    if( yearQuery.status === "error" ) {
        return <h2>Error while getting years</h2>;
    }

    if( curriculumQuery.status === "error" ) {
        return <h2>Error while getting curriculums</h2>;
    }

    const availableCurriculums = curriculumQuery.data.filter((curriculum) => curriculum.year === currentYear);

    return (
        <div className={styles.overviewContainer}>
            <h1>Overview</h1>
            <SelectWithTitle
                key={'startYear'}
                title={'Startjahr'}
                selectProps={{ options: yearQuery.data, onChange: setCurrentYear }}
            />

            <SelectWithTitle key={'curriculum'} title={'Lehrgang'} selectProps={{ options: availableCurriculums }} />
        </div>
    );
}
