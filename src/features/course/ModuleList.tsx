import Grid from '@components/Grid.tsx';
import { LinkButtonCellRenderer } from '@features/course/LinkButtonCellRenderer.tsx';
import { newCourseRoute } from '@pages/routes/courseRoutes.ts';
import { moduleRoute } from '@pages/routes/routes.ts';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Spin } from 'antd';
import axios from 'axios';
import styles from './ModuleList.module.scss';

export interface ModuleResponse {
    id: number;
    version: number;
    description: string;
    number: string;
    isActive: boolean;
    grade: number;
    studyStage: StudyStage;
}

export interface StudyStage {
    id: number;
    description: string;
}

const defaultModuleColDef: ColDef<ModuleResponse> = { sortable: true, filter: 'agTextColumnFilter' };

const moduleColumnDefs: ColDef<ModuleResponse>[] = [
    { field: 'id', headerName: '', filter: null, cellRenderer: LinkButtonCellRenderer },
    { field: 'id', headerName: 'ID', filter: 'agNumberColumnFilter', sort: 'asc' },
    { field: 'description', headerName: 'Module', flex: 1 },
    { field: 'description', headerName: 'Studiengang', flex: 1 },
    { field: 'studyStage.description', headerName: 'Lehrgang' },
    //{ field: 'isActive', headerName: 'Status' },
    {
        field: 'isActive',
        headerName: 'Status',
        cellRenderer: (params: { value: boolean }) => {
            if (params.value) {
                return <div className={styles.isActive}>Aktiv</div>;
            } else {
                return <div className={styles.isInactive}>Inaktiv</div>;
            }
        },
    },
];

export default function ModuleList() {
    const { isPending, isError, data } = useQuery({
        queryKey: ['modules'],
        queryFn: async () => {
            const { data } = await axios.get<ModuleResponse[]>(`${import.meta.env.VITE_BACKEND_API_URL}/modules`);
            return data;
        },
    });

    if (isError) return <div>Error when loading courses</div>;
    if (isPending) return <Spin />;

    return (
        <div className={styles.moduleContainer}>
            <Link from={moduleRoute.to} to={newCourseRoute.to}>
                <Button type={'primary'}>+ New Module</Button>
            </Link>

            <Grid<ModuleResponse> columnDefs={moduleColumnDefs} rowData={data} defaultColDef={defaultModuleColDef} />
        </div>
    );
}
