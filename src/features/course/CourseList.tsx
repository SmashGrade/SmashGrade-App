import { getValueGetter } from '@components/grid/columnFormatter.ts';
import Grid from '@components/grid/Grid.tsx';
import { MaterialIcon } from '@components/ui-elements/MaterialIcon.tsx';
import { getCourses } from '@features/course-admin/course/courseApi.ts';
import { CourseObject } from '@features/course-admin/interfaces/Course.ts';
import { LinkButtonCellRenderer } from '@features/course/LinkButtonCellRenderer.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from 'antd';
import { Route as CourseIndexRoute } from '../../routes/course/index.tsx';
import styles from './Course.module.scss';

interface Module {
    id: number;
    version: number;
    description: string;
    number: string;
    isActive: boolean;
}

interface Exam {
    id: number;
    description: string;
    weight: number;
    type: string;
}

interface Teacher {
    id: number;
    name: string;
}

export interface CourseResponse {
    id: number;
    version: number;
    description: string;
    number: string;
    versions: number[];
    modules: Module[];
    exams: Exam[];
    teachers: Teacher[];
}

const defaultCourseColDef: ColDef<CourseObject> = {
    sortable: true,
    filter: 'agTextColumnFilter',
};

const courseColumnDefs: ColDef<CourseObject>[] = [
    {
        field: 'id',
        headerName: '',
        filter: null,
        cellRenderer: LinkButtonCellRenderer,
        cellRendererParams: {
            from: CourseIndexRoute.to,
            to: '/course/$id',
        },
        width: 100,
    },
    {
        field: 'id',
        headerName: 'ID',
        filter: 'agNumberColumnFilter',
        sort: 'asc',
        width: 100,
    },
    { field: 'number', headerName: 'Number', width: 100 },
    { field: 'description', headerName: 'Name', flex: 2 },
    {
        field: 'teachedBy',
        headerName: 'Teachers',
        flex: 1,
        valueGetter: getValueGetter('teachedBy', 'name'),
    },
    {
        field: 'modules',
        headerName: 'Modules',
        flex: 2,
        valueGetter: getValueGetter('modules', 'description'),
    },
    {
        field: 'exams',
        headerName: 'Exams',
        flex: 2,
        valueGetter: getValueGetter('exams', 'description'),
    },
];

export default function CourseList() {
    const courses = useSuspenseQuery({
        queryKey: ['courses'],
        queryFn: getCourses,
    }).data;

    return (
        <div className={styles.courseContainer}>
            <Button type={'primary'} className={styles.addButton}>
                <Link from={CourseIndexRoute.to} to={'/course/new'} className={styles.addLink}>
                    <MaterialIcon icon={'add'} size={'small'} />
                    New Course
                </Link>
            </Button>

            <Grid<CourseObject> columnDefs={courseColumnDefs} rowData={courses} defaultColDef={defaultCourseColDef} />
        </div>
    );
}
