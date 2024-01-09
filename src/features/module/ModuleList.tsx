import { copyModuleRoute, moduleDetailRoute, newModuleRoute } from '@pages/routes/moduleRoutes.ts';
import { moduleRoute } from '@pages/routes/routes.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { Button, Spin, Dropdown, Input, message } from 'antd';
import type { MenuProps } from 'antd';
import axios from 'axios';
import { MoreOutlined, EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import React, { useCallback, useRef } from 'react';
import styles from './ModuleList.module.scss';
import { FormattedMessage } from 'react-intl';

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

// Function to generate menu items dynamically based on id
const getMenuItems = (id: number, handleDelete: (id: number) => void): MenuProps['items'] => [
    {
        key: 'edit',
        label: (
            <Link from={moduleRoute.to} to={moduleDetailRoute.to} params={{ id }}>
                <EditOutlined /> <FormattedMessage id={'moduleList.edit'} defaultMessage={'Editieren'} />
            </Link>
        ),
    },
    {
        key: 'copy',
        label: (
            <Link from={moduleRoute.to} to={copyModuleRoute.to} params={{ id }}>
                <CopyOutlined />{' '}
                <FormattedMessage
                    id={'moduleList.copy'}
                    defaultMessage={'Kopieren'}
                    description={'Menu item to copy a module'}
                />
            </Link>
        ),
    },
    {
        key: 'delete',
        label: (
            <Button
                className={styles.deleteButton}
                onClick={() => {
                    handleDelete(id);
                }}
            >
                <DeleteOutlined />{' '}
                <FormattedMessage
                    id={'moduleList.delete'}
                    defaultMessage={'Löschen'}
                    description={'Menu item to delete a module'}
                />
            </Button>
        ),
    },
];

const { Search } = Input;

const defaultModuleColDef: ColDef<ModuleResponse> = { sortable: true, filter: 'agTextColumnFilter' };

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

export default function ModuleList() {
    const gridRef = useRef<AgGridReact>(null);
    const queryClient = useQueryClient();

    const {
        isLoading: isGetModulePending,
        isError: isGetModuleError,
        data: moduleData,
    } = useQuery({
        queryKey: ['modules'],
        queryFn: getModules,
    });

    const deleteModuleMutation = useMutation({
        mutationFn: deleteModuleById,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['modules'] });
            void message.success(
                <FormattedMessage
                    id={'moduleList.deleteSuccessMessage'}
                    description={'Module Delete success message'}
                    defaultMessage={'Modul erfolgreich gelöscht'}
                />
            );
        },
    });

    const handleDelete = (id: number) => {
        if (window.confirm('Wirklich Löschen?')) {
            // Call the mutation function with the module id
            deleteModuleMutation.mutate(id);
        }
    };

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

    const moduleColumnDefs: ColDef<ModuleWithActions>[] = [
        { field: 'moduleDescription', headerName: 'Module', flex: 1 },
        { field: 'curriculumDescription', headerName: 'Studiengang', flex: 1 },
        { field: 'studyStage', headerName: 'Lehrgang' },
        {
            field: 'moduleIsActive',
            headerName: 'Status',
            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: { value: boolean }) => <StatusCellRenderer value={params.value} />,
        },
        {
            field: 'actions',
            headerName: '',
            resizable: false,
            width: 50,
            sortable: false,
            filter: '',
            cellRenderer: (params: { data: ModuleObject }) => <ActionsCellRenderer data={params.data} />,
        },
    ];

    const onFilterInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        onFilterTextBoxChanged(e.target.value);
    };

    // Renders the active/inactive Values
    const StatusCellRenderer: React.FC<{ value: boolean }> = ({ value }) => {
        return (
            <div className={value ? styles.isActive : styles.isInactive}>
                {value ? (
                    <FormattedMessage
                        id={'moduleList.activeModule'}
                        defaultMessage={'Aktiv'}
                        description={'Displays the module status'}
                    />
                ) : (
                    <FormattedMessage
                        id={'moduleList.inactiveModule'}
                        defaultMessage={'Inaktiv'}
                        description={'Displays the module status'}
                    />
                )}
            </div>
        );
    };

    const ActionsCellRenderer: React.FC<{ data: ModuleObject }> = ({ data }) => {
        return (
            <Dropdown className={styles.alignSubmenu} menu={{ items: getMenuItems(data.moduleId, handleDelete) }}>
                <Button type={'link'} icon={<MoreOutlined />} />
            </Dropdown>
        );
    };

    return (
        <div className={styles.moduleContainer}>
            <div className={styles.spaceBetweenButtonAndSearch}>
                <Link from={moduleRoute.to} to={newModuleRoute.to}>
                    <Button type={'primary'}>
                        + &nbsp;
                        <FormattedMessage
                            id={'moduleList.addModuleButton'}
                            defaultMessage={'Modul hinzufügen'}
                            description={'Button for creating a new module'}
                        />
                    </Button>
                </Link>

                <Search placeholder={'Filter...'} onChange={onFilterInputChange} className={styles.searchbar} />
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
