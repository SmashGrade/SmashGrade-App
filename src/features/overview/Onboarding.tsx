import { RocketOutlined } from '@ant-design/icons';
import SelectWithTitle from '@components/ui-elements/SelectWithTitle.tsx';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
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
    const { data } = await axios.get<YearResponse[]>(`${import.meta.env.VITE_BACKEND_API_URL}/startYears`, {});

    return data.map(({ year }) => ({ value: year, label: year.toString() }));
}

async function getCurriculums(): Promise<Curriculum[]> {
    const { data } = await axios.get<CurriculumResponse[]>(`${import.meta.env.VITE_BACKEND_API_URL}/curriculums`);

    return data.map((curriculum) => ({ value: curriculum.title, label: curriculum.title, year: curriculum.year }));
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
    const intl = useIntl();

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
            <h1>
                <FormattedMessage
                    id={'onboarding.title'}
                    defaultMessage={'Übersicht'}
                    description={'Übersicht Titel'}
                />
            </h1>
            <SelectWithTitle
                key={'startYear'}
                selectProps={{ options: yearData, onChange: setCurrentYear }}
                title={intl.formatMessage({
                    id: 'startYear',
                    defaultMessage: 'Startjahr',
                    description: 'Startjahr Dropdown Titel',
                })}
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
