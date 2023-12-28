import Grid from '@components/Grid.tsx';
import { newCourseRoute } from '@pages/routes/courseRoutes.ts';
import { moduleRoute } from '@pages/routes/routes.ts';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Spin, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import axios from 'axios';
import { MoreOutlined } from '@ant-design/icons';
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

interface ModuleWithActions extends ModuleResponse {
    actions?: 'Edit' | 'Copy' | 'Delete';
}

export interface StudyStage {
    id: number;
    description: string;
}

const menuItems: MenuProps['items'] = [
    {
        key: 'edit',
        label: 'Editieren',
    },
    {
        key: 'copy',
        label: 'Kopieren',
    },
    {
        key: 'delete',
        label: 'Löschen',
    },
];

const handleMenuClick = (action: string, id: number) => {
    // handle the action here
    switch (action) {
        case 'edit':
            // handle edit action
            console.debug('edit' + id);
            break;
        case 'copy':
            // handle edit action
            console.debug('copy' + id);
            break;
        case 'delete':
            // handle edit action
            console.debug('delete' + id);
            break;
        // add cases for 'copy' and 'delete' if needed
        default:
            break;
    }
};

const defaultModuleColDef: ColDef<ModuleResponse> = { sortable: true, filter: 'agTextColumnFilter' };

const moduleColumnDefs: ColDef<ModuleWithActions>[] = [
    //{ field: 'id', headerName: '', filter: null, cellRenderer: LinkButtonCellRenderer },
    //{ field: 'id', headerName: 'ID', filter: 'agNumberColumnFilter', sort: 'asc' },
    { field: 'description', headerName: 'Module', flex: 1 },
    { field: 'description', headerName: 'Studiengang', flex: 1 },
    { field: 'studyStage.description', headerName: 'Lehrgang' },
    //{ field: 'isActive', headerName: 'Status' },
    {
        field: 'isActive',
        headerName: 'Status',
        cellStyle: { textAlign: 'center' },
        cellRenderer: (params: { value: boolean }) => {
            if (params.value) {
                return <div className={styles.isActive}>Aktiv</div>;
            } else {
                return <div className={styles.isInactive}>Inaktiv</div>;
            }
        },
    },
    {
        field: 'actions',
        headerName: '',
        resizable: false,
        width: 50,
        sortable: false,
        filter: '',
        cellRenderer: (params: { data: ModuleResponse }) => {
            return (
                <Dropdown menu={{ items: menuItems, onClick: ({ key }) => handleMenuClick(key, params.data.id) }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <MoreOutlined />
                    </a>
                </Dropdown>
            );
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
