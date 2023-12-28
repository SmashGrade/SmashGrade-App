//import Grid from '@components/Grid.tsx';
import { copyModuleRoute, moduleDetailRoute, newModuleRoute } from '@pages/routes/moduleRoutes.ts';
import { moduleRoute } from '@pages/routes/routes.ts';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { Button, Spin, Dropdown, Input } from 'antd';
import type { MenuProps } from 'antd';
import axios from 'axios';
import { MoreOutlined, EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { useCallback, useRef } from 'react';
import styles from './ModuleList.module.scss';

export interface ModuleResponse {
    id: number;
    version: number;
    description: string;
    number: string;
    isActive: boolean;
    studyStage: {
        id: number;
        description: string;
    };
    valuationCategory: {
        description: string;
        code: string;
    };
    courses: Course[];
}

interface Curriculum {
    id: number;
    focus: string;
    field: string;
    curriculumType: string;
    isActive: boolean;
    startDate: string;
    endDate: string;
    description: string;
    fieldmanagers: { id: number; name: string }[];
    modules: ModuleResponse[];
}

interface Course {
    id: number;
    version: number;
    description: string;
    number: string;
    versions: number[];
    modules: ModuleResponse[];
    exams: Exam[];
    teachers: Teacher[];
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

interface ModuleObject {
    curriculumId: number;
    curriculumDescription: string;
    moduleId: number;
    moduleDescription: string;
    moduleIsActive: boolean;
    studyStage: string;
}

interface ModuleWithActions extends ModuleObject {
    actions?: 'Edit' | 'Copy' | 'Delete';
}

export interface StudyStage {
    id: number;
    description: string;
}

// Function to generate menu items dynamically based on id
const getMenuItems = (id: number): MenuProps['items'] => [
    {
        key: 'edit',
        label: (
            <Link from={moduleRoute.to} to={moduleDetailRoute.to} params={{ id }}>
                <EditOutlined /> Editieren
            </Link>
        ),
    },
    {
        key: 'copy',
        label: (
            <Link from={moduleRoute.to} to={copyModuleRoute.to} params={{ id }}>
                <CopyOutlined /> Kopieren
            </Link>
        ),
    },
    {
        key: 'delete',
        label: (
            <Link from={moduleRoute.to} to={copyModuleRoute.to} params={{ id }}>
                <DeleteOutlined /> Löschen
            </Link>
        ),
    },
];

//const menuItems = getMenuItems(0); // Pass the actual id here

const { Search } = Input;
/*const handleMenuClick = (action: string, id: number) => {
    // handle the action here
    switch (action) {
        case 'edit':
            console.debug('edit' + id);
            break;
        case 'copy':
            console.debug('copy' + id);
            break;
        case 'delete':
            console.debug('delete' + id);
            break;
        default:
            break;
    }
};*/

const defaultModuleColDef: ColDef<ModuleResponse> = { sortable: true, filter: 'agTextColumnFilter' };

const moduleColumnDefs: ColDef<ModuleWithActions>[] = [
    //{ field: 'id', headerName: '', filter: null, cellRenderer: LinkButtonCellRenderer },
    //{ field: 'id', headerName: 'ID', filter: 'agNumberColumnFilter', sort: 'asc' },
    { field: 'moduleDescription', headerName: 'Module', flex: 1 },
    { field: 'curriculumDescription', headerName: 'Studiengang', flex: 1 },
    { field: 'studyStage', headerName: 'Lehrgang' },
    //{ field: 'isActive', headerName: 'Status' },
    {
        field: 'moduleIsActive',
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
        cellRenderer: (params: { data: ModuleObject }) => {
            return (
                <Dropdown
                    menu={{
                        items: getMenuItems(params.data.moduleId),
                        //onClick: ({ key }) => handleMenuClick(key, params.data.id),
                    }}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <MoreOutlined />
                    </a>
                </Dropdown>
            );
        },
    },
];

// fetch data from curriculum to get all needed data for the module overview
async function getModules(): Promise<ModuleObject[]> {
    /*const { data } = await axios.get<ModuleResponse[]>(`${import.meta.env.VITE_BACKEND_API_URL}/curriculum`);
    return data;*/

    const { data: curriculumData } = await axios.get<Curriculum[]>(
        `${import.meta.env.VITE_BACKEND_API_URL}/curriculum`
    );

    // Flatten the array of curriculum with modules and create an array of module objects
    const moduleObjects: ModuleObject[] = curriculumData.flatMap((curriculum) =>
        curriculum.modules.flatMap((module) =>
            module.courses.flatMap((course) =>
                course.modules.map((courseModule) => ({
                    curriculumId: curriculum.id,
                    curriculumDescription: curriculum.description,
                    moduleId: courseModule.id,
                    moduleDescription: courseModule.description,
                    moduleIsActive: courseModule.isActive,
                    studyStage: module.studyStage.description,
                }))
            )
        )
    );
    console.debug(moduleObjects);
    return moduleObjects;
}

/*async function deleteModuleById(id: number): Promise<void> {
    try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}/modules/${id}`);
    } catch (error) {
        console.error(`Error deleting module with ID ${id}:`, error);
        throw error; // Propagate the error for error handling
    }
}*/

export default function ModuleList() {
    const gridRef = useRef<AgGridReact>(null);

    const { isPending, isError, data } = useQuery({
        queryKey: ['modules'],
        queryFn: getModules,
    });

    /*const { isPending, isError, idData } = useQuery({
        queryKey: ['deleteModules'],
        queryFn: async () => {
            const { data } = await axios.delete<ModuleResponse[]>(
                `${import.meta.env.VITE_BACKEND_API_URL}/modules/${id}`
            );
            return data;
        },
    });*/

    // Filter for the searchbar
    const onFilterTextBoxChanged = useCallback((value: string) => {
        if (gridRef.current) {
            gridRef.current.api.setQuickFilter(value);
        }
    }, []);

    if (isError) return <div>Error when loading courses</div>;
    if (isPending) return <Spin />;

    return (
        <div className={styles.moduleContainer}>
            <div className={styles.spaceBetweenButtonAndSearch}>
                <Link from={moduleRoute.to} to={newModuleRoute.to}>
                    <Button type={'primary'}>+ New Module</Button>
                </Link>

                <Search
                    placeholder={'Filter...'}
                    onChange={(e) => onFilterTextBoxChanged(e.target.value)}
                    className={styles.searchbar}
                />
            </div>
            <div className={`ag-theme-alpine ${styles.table}`}>
                <AgGridReact
                    ref={gridRef}
                    rowData={data}
                    columnDefs={moduleColumnDefs}
                    defaultColDef={defaultModuleColDef}
                />
            </div>
        </div>
    );
}
