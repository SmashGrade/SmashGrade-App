import { RocketOutlined } from '@ant-design/icons';
import SelectWithTitle from '@components/ui-elements/SelectWithTitle.tsx';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styles from './Overview.module.scss';

interface OnboardingProps {
    isReadonly: boolean;
}

interface Year {
    value: number;
    label: string;
}

interface OnboardingFilterResponse {
    curriculumTypes: CurriculumType[];
    curriculums: CurriculumResponse[];
}

interface CurriculumType {
    id: number;
    description: string;
    durationYears: number;
}

interface CurriculumResponse {
    id: number;
    focus: string;
    field: string;
    curriculumType: string;
    isActive: boolean;
    startDate: string | Date;
    endDate: string | Date;
}

function getYears(): Year[] {
    const currentYear = new Date().getFullYear();

    return Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => ({
        value: year,
        label: year.toString(),
    }));
}

async function getOnboardingFilter(): Promise<OnboardingFilterResponse> {
    const response = await axios.get<OnboardingFilterResponse>(
        `${import.meta.env.VITE_BACKEND_API_URL}/onboardingFilter`
    );

    if (response.status !== 200) {
        throw new Error('Error while getting onboarding filter');
    }

    response.data.curriculums = response.data.curriculums.map((curr) => ({
        ...curr,
        startDate: new Date(curr.startDate),
        endDate: new Date(curr.endDate),
    }));

    return response.data;
}

export default function Onboarding({ isReadonly }: Readonly<OnboardingProps>) {
    const {
        isLoading: onboardingLoading,
        error: onboardingError,
        data: onboardingData,
    } = useQuery({
        queryKey: ['onboarding'],
        queryFn: getOnboardingFilter,
    });

    const yearData: Year[] = getYears();

    const [currentYear, setCurrentYear] = useState(yearData?.length ? yearData[0].value : 0);
    const [selectedCurriculumType, setSelectedCurriculumType] = useState(
        onboardingData?.curriculumTypes?.length ? onboardingData?.curriculumTypes[0].description : ''
    );
    const intl = useIntl();

    if (onboardingLoading) {
        return <h2>Loading</h2>;
    }

    if (onboardingError) {
        return <h2>Error while getting onboarding filter</h2>;
    }

    const curriculumTypes = onboardingData?.curriculumTypes.map((curriculumType) => ({
        value: curriculumType.description,
        label: curriculumType.description,
    }));

    const availableCurriculums = onboardingData?.curriculums?.length
        ? onboardingData?.curriculums
              .filter((curriculum) => {
                  const startDate = curriculum.startDate;
                  const endDate = curriculum.endDate;

                  if (startDate instanceof Date && endDate instanceof Date) {
                      return startDate.getFullYear() <= currentYear && endDate.getFullYear() >= currentYear;
                  }

                  return false;
              })
              .filter((curriculum) => curriculum.curriculumType === selectedCurriculumType)
              .map((curriculum) => ({ value: curriculum.id, label: curriculum.focus }))
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
                selectProps={{ options: getYears(), onChange: setCurrentYear, disabled: isReadonly }}
                title={intl.formatMessage({
                    id: 'startYear',
                    defaultMessage: 'Startjahr',
                    description: 'Startjahr Dropdown Titel',
                })}
            />

            <SelectWithTitle
                key={'studyType'}
                selectProps={{ options: curriculumTypes, onChange: setSelectedCurriculumType, disabled: isReadonly }}
                title={'Test'}
            />

            <SelectWithTitle
                key={'curriculum'}
                title={intl.formatMessage({
                    id: 'curriculum',
                    defaultMessage: 'Lehrplan',
                    description: 'Lehrplan Dropdown Titel',
                })}
                selectProps={{ options: availableCurriculums, disabled: isReadonly }}
            />
            {!isReadonly && (
                <Button type={'primary'} icon={<RocketOutlined />}>
                    Studium starten
                </Button>
            )}
        </div>
    );
}
