import Modules from '@features/student/modules/Modules.tsx';
import StudiesFilter from '@features/student/modules/StudiesFilter.tsx';
import { useState } from 'react';

export default function StudentModulePage() {
    const [selectedFilter, setSelectedFilter] = useState<string>('Grundstudium');

    return (
        <>
            <StudiesFilter defaultActiveKey={selectedFilter} tabsProps={{ onChange: setSelectedFilter }} />
            <Modules activeFilter={selectedFilter} />
        </>
    );
}
