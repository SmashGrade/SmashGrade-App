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
import { defineMessages, FormattedMessage } from 'react-intl';

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
    actions: 'Edit' | 'Copy' | 'Delete';
}

// Internationalization to use it without intl
const messages = defineMessages({
    edit: {
        id: 'moduleList.edit',
        defaultMessage: 'Editieren',
    },
    copy: {
        id: 'moduleList.copy',
        defaultMessage: 'Kopieren',
        description: 'Menu item to copy a module',
    },
    delete: {
        id: 'moduleList.delete',
        defaultMessage: 'Löschen',
        description: 'Menu item to delete a module',
    },
    deleteMessage: {
        id: 'moduleList.deleteMessage',
        defaultMessage: 'Möchtest du das Module wirklich löschen?',
        description: 'Popup Message to confirm deletion of a module',
    },
    addModuleButton: {
        id: 'moduleList.addModuleButton',
        defaultMessage: 'Modul hinzufügen',
        description: 'Button for creating a new module',
    },
});

// Function to generate menu items dynamically based on id
const getMenuItems = (
    id: number,
    itemToDeleteDescription: string,
    handleDelete: (id: number) => void
): MenuProps['items'] => [
    {
        key: 'edit',
        label: (
            <Link from={moduleRoute.to} to={moduleDetailRoute.to} params={{ id }}>
                <EditOutlined /> <FormattedMessage {...messages.edit} />
            </Link>
        ),
    },
    {
        key: 'copy',
        label: (
            <Link from={moduleRoute.to} to={copyModuleRoute.to} params={{ id }}>
                <CopyOutlined /> <FormattedMessage {...messages.copy} />
            </Link>
        ),
    },
    {
        key: 'delete',
        label: (
            <span
                style={{ color: 'red' }}
                onClick={() => {
                    if (window.confirm('Wirklich Löschen?' + '\n' + itemToDeleteDescription)) {
                        handleDelete(id);
                    }
                }}
                role={'button'}
            >
                <DeleteOutlined /> <FormattedMessage {...messages.delete} />
            </span>
        ),
    },
];

const { Search } = Input;

const defaultModuleColDef: ColDef<ModuleResponse> = { sortable: true, filter: 'agTextColumnFilter' };

const moduleColumnDefs: ColDef<ModuleWithActions>[] = [
    { field: 'moduleDescription', headerName: 'Module', flex: 1 },
    { field: 'curriculumDescription', headerName: 'Studiengang', flex: 1 },
    { field: 'studyStage', headerName: 'Lehrgang' },
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
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        items: getMenuItems(params.data.moduleId, params.data.moduleDescription, handleDelete),
                    }}
                >
                    <a onClick={(e) => e.preventDefault()} role={'button'}>
                        <MoreOutlined />
                    </a>
                </Dropdown>
            );
        },
    },
];

// fetch data from curriculum to get all needed data for the module overview
async function getModules(): Promise<ModuleObject[]> {
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

async function deleteModuleById(id: number): Promise<void> {
    await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}/modules/${id}`);
}

async function handleDelete(id: number) {
    try {
        await deleteModuleById(id);
        await getModules();
    } catch (error) {
        console.debug("Can't delete module with ID: " + id);
    }
}

export default function ModuleList() {
    const gridRef = useRef<AgGridReact>(null);

    const {
        isLoading: isGetModulePending,
        isError: isGetModuleError,
        data: moduleData,
    } = useQuery({
        queryKey: ['modules'],
        queryFn: getModules,
    });

    // Filter for the searchbar
    const onFilterTextBoxChanged = useCallback((value: string) => {
        if (gridRef.current) {
            gridRef.current.api.setQuickFilter(value);
        }
    }, []);

    if (isGetModuleError) return <div>Error when loading courses</div>;
    if (isGetModulePending) return <Spin />;

    /*    if (isDeleteModulePending) return <div>Error when loading courses</div>;
    if (isDeleteModuleError) return <Spin />;*/

    return (
        <div className={styles.moduleContainer}>
            <div className={styles.spaceBetweenButtonAndSearch}>
                <Link from={moduleRoute.to} to={newModuleRoute.to}>
                    <Button type={'primary'}>
                        + &nbsp;
                        <FormattedMessage {...messages.addModuleButton} />
                    </Button>
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
                    rowData={moduleData}
                    columnDefs={moduleColumnDefs}
                    defaultColDef={defaultModuleColDef}
                />
            </div>
        </div>
    );
}
