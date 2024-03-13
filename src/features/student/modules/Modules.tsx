import { ModuleResponseNew } from '@features/course-admin/interfaces/ModuleData.ts';
import { Course, CourseObj } from '@features/student/modules/Course.tsx';
import Rating from '@features/student/modules/Rating.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Collapse } from 'antd';
import { ItemType } from 'rc-collapse/es/interface';
import { CSSProperties } from 'react';
import { FormattedMessage } from 'react-intl';
import { getModules } from '@features/course-admin/module/moduleApi.ts';

const panelStyle: CSSProperties = {
    fontWeight: 'bold',
    border: 'none',
};

interface ModulesProps {
    activeFilter: string;
}

interface Module {
    id: number;
    description: string;
    number: string;
    isActive: boolean;
    grade: number;
    courses: CourseObj[];
}

const getModulesForFilter = async (activeFilter: string): Promise<ItemType[]> => {
    const modules: ModuleResponseNew[] = await getModules();

    return modules
        .filter((module) => module.isActive && module.studyStage.id.toString() === activeFilter)
        .map((module) => {
            return {
                key: module.id,
                label: module.description,
                children: module.courses.map((course) => <Course key={course.id} course={course} />),
                // TODO: Add rating to module
                extra: <Rating rating={5.5} />,
                style: panelStyle,
            };
        });
};

export default function Modules({ activeFilter }: Readonly<ModulesProps>) {
    const modules = useSuspenseQuery({
        queryKey: ['studentModules', activeFilter],
        queryFn: () => getModulesForFilter(activeFilter),
    }).data;

    return modules?.length ? (
        <Collapse items={modules} />
    ) : (
        <h2>
            <FormattedMessage
                id={'student.noModulesFound'}
                defaultMessage={'Es wurden keine Module gefunden'}
                description={'no modules found'}
            />
        </h2>
    );
}
