import Grid from '@components/Grid.tsx';
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
import { MoreOutlined, EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import React, { useCallback, useRef } from 'react';
import styles from './ModuleList.module.scss';
import { FormattedMessage } from 'react-intl';
import { ModuleObject } from '@features/course-admin/interfaces/ModuleData.ts';
import { getModules, deleteModuleById } from '@features/course-admin/module/moduleApi.ts';

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
                <CopyOutlined className={styles.iconTextSpaceBetween} />
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
                icon={<DeleteOutlined className={styles.iconTextSpaceBetween} />}
            >
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

const defaultModuleColDef: ColDef<ModuleObject> = { sortable: true, filter: 'agTextColumnFilter' };

// fetch data from curriculum to get all needed data for the module overview

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

    const moduleColumnDefs: ColDef<ModuleObject>[] = [
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
            colId: 'actions',
            headerName: '',
            resizable: false,
            width: 50,
            cellStyle: { padding: '0px', textAlign: 'center' },
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
            <Grid<ModuleObject>
                gridRef={gridRef}
                rowData={moduleData}
                columnDefs={moduleColumnDefs}
                defaultColDef={defaultModuleColDef}
            />
        </div>
    );
}
