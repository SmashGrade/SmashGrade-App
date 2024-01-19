import Modules from '@features/student/modules/Modules.tsx';
import StudyStageFilter from '@features/student/modules/StudyStageFilter.tsx';
import { useState } from 'react';

function setStudyStageFilter(filter: string, setFilter: (filter: string) => void) {
    setFilter(filter);
    localStorage.setItem('studyStageFilter', filter);
}

export default function StudentModulePage() {
    const [selectedFilter, setSelectedFilter] = useState<string>(localStorage.getItem('studyStageFilter') ?? '1');

    return (
        <>
            <StudyStageFilter
                defaultActiveKey={selectedFilter}
                tabsProps={{ onChange: (value) => setStudyStageFilter(value, setSelectedFilter) }}
            />
            <Modules activeFilter={selectedFilter} />
        </>
    );
}
