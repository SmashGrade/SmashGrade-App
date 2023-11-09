import { Course, CourseObj } from '@features/student/modules/Course.tsx';
import Rating from '@features/student/modules/Rating.tsx';
import { useQuery } from '@tanstack/react-query';
import { Collapse, Spin } from 'antd';
import axios from 'axios';
import { ItemType } from 'rc-collapse/es/interface';
import { CSSProperties } from 'react';
import { FormattedMessage } from 'react-intl';

const panelStyle: CSSProperties = {
    fontWeight: 'bold',
    border: 'none',
};

interface ModulesProps {
    activeFilter: string;
}

interface StudentModuleResponse {
    id: number;
    modules: Module[];
}

interface Module {
    id: number;
    description: string;
    number: string;
    isActive: boolean;
    grade: number;
    courses: CourseObj[];
}

const getCourses = (courses: CourseObj[]) => {
    return (
        <>
            {courses.map((course) => (
                <Course key={course.id} course={course} />
            ))}
        </>
    );
};

const getModules = async (activeFilter: string): Promise<ItemType[]> => {
    const studentModuleResponse = await axios.get<StudentModuleResponse>(
        `${import.meta.env.VITE_BACKEND_API_URL}/moduleStudent/${activeFilter}`
    );
    const modules = studentModuleResponse.data.modules;

    return modules
        .filter((module) => module.isActive)
        .map((module) => {
            return {
                key: module.id,
                label: module.description,
                children: getCourses(module.courses),
                extra: <Rating rating={module.grade} />,
                style: panelStyle,
            };
        });
};

export default function Modules({ activeFilter }: Readonly<ModulesProps>) {
    const {
        isLoading: modulesLoading,
        error: modulesError,
        data: modules,
    } = useQuery({
        queryKey: ['StudentModules' + activeFilter],
        queryFn: () => getModules(activeFilter),
    });

    if (modulesLoading) {
        return <Spin />;
    }

    if (modulesError) {
        return <h2>Error</h2>;
    }
    return modules && modules.length > 0 ? (
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
