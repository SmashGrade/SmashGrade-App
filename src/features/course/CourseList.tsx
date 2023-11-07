import Grid from '@components/Grid.tsx';
import { OpenDetailButton } from '@features/course/OpenDetailButton.tsx';
import { newCourseRoute } from '@pages/routes/courseRoutes.ts';
import { courseRoute } from '@pages/routes/routes.ts';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { Button, Spin } from 'antd';
import axios from 'axios';
import styles from './Course.module.scss';

export interface CourseResponse {
    id: number;
    description: string;
    number: string;
    teachers: string[];
    evaluationType: 'E' | 'M' | 'P';
}

const defaultCourseColDef: ColDef<CourseResponse> = { sortable: true, filter: 'agTextColumnFilter' };

const courseColumnDefs: ColDef<CourseResponse>[] = [
    { field: 'id', headerName: '', filter: null, cellRenderer: OpenDetailButton },
    { field: 'id', headerName: 'ID', filter: 'agNumberColumnFilter', sort: 'asc' },
    { field: 'number', headerName: 'Course Number' },
    { field: 'description', headerName: 'Course Name', flex: 1 },
    { field: 'teachers', headerName: 'Teachers', flex: 1 },
    { field: 'evaluationType', headerName: 'Evaluation Type' },
];

export default function CourseList() {
    const { isPending, isError, data } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const { data } = await axios.get<CourseResponse[]>(`${import.meta.env.VITE_BACKEND_API_URL}/courses`);
            return data;
        },
    });

    if (isError) return <div>Error when loading courses</div>;
    if (isPending) return <Spin />;

    return (
        <div className={styles.courseContainer}>
            <Link from={courseRoute.to} to={newCourseRoute.to}>
                <Button>New Course</Button>
            </Link>

            <Grid<CourseResponse> columnDefs={courseColumnDefs} rowData={data} defaultColDef={defaultCourseColDef} />
        </div>
    );
}
