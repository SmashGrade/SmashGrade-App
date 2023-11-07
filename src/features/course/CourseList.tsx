import Grid from '@components/Grid.tsx';
import { courseDetailRoute, newCourseRoute } from '@pages/routes/courseRoutes.ts';
import { courseRoute } from '@pages/routes/routes.ts';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { Button, Spin } from 'antd';
import axios from 'axios';
import styles from './Course.module.scss';

interface CourseResponse {
    id: number;
    description: string;
    number: string;
    teachers: string[];
    evaluationType: 'E' | 'M' | 'P';
}

function EditButton(params: ICellRendererParams<CourseResponse, number>) {
    return (
        <Link
            from={courseRoute.to}
            to={courseDetailRoute.to}
            params={{
                id: params?.value ?? 0,
            }}
        >
            <Button>Edit</Button>
        </Link>
    );
}

const defaultCourseColDef: ColDef<CourseResponse> = { sortable: true, filter: 'agTextColumnFilter' };

const courseColumnDefs: ColDef<CourseResponse>[] = [
    { field: 'id', headerName: undefined, filter: null, cellRenderer: EditButton },
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
