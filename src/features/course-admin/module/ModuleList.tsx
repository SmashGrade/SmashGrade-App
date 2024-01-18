import { CopyOutlined, DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import DropdownCellRenderer from '@components/grid/DropdownCellRenderer.tsx';
import Grid from '@components/grid/Grid.tsx';
import StatusCellRenderer from '@components/grid/StatusCellRenderer.tsx';
import { ModuleObject } from '@features/course-admin/interfaces/ModuleData.ts';
import { deleteModuleById, getModules } from '@features/course-admin/module/moduleApi.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import type { MenuProps } from 'antd';
import { Button, Input, message, Modal, Spin } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Route as ModuleDetailRoute } from '../../../routes/module/$id.tsx';
import { Route as CopyModuleRoute } from '../../../routes/module/copy.$id.tsx';
import styles from './ModuleList.module.scss';

const { Search } = Input;

const defaultModuleColDef: ColDef<ModuleObject> = { sortable: true, filter: 'agTextColumnFilter' };

export default function ModuleList() {
    const gridRef = useRef<AgGridReact>(null);
    const queryClient = useQueryClient();

    const intl = useIntl();

    // States for the Modal Delete Popup
    const [moduleIdToDelete, setModuleIdToDelete] = useState<number | null>(null);
    const [modalState, setModalState] = useState({ open: false, confirmLoading: false });
    const [modalText, setModalText] = useState<React.ReactNode | undefined>();

    const showModal = (id: number, moduleDescription: string) => {
        const message = (
            <>
                {intl.formatMessage({
                    id: 'moduleList.deleteMessage',
                    defaultMessage: 'Möchtest du das Modul wirklich löschen?',
                    description: 'Modal Message to confirm the deletion',
                })}
                <br />
                <strong>{moduleDescription}</strong>
            </>
        );

        setModalText(message);
        setModalState({ ...modalState, open: true });
        setModuleIdToDelete(id);
    };

    const handleOk = () => {
        setModalState({ ...modalState, confirmLoading: true });
        if (moduleIdToDelete !== null) {
            deleteModuleMutation.mutate(moduleIdToDelete);
        }
    };

    const handleCancel = () => {
        setModalState({ ...modalState, open: false });
    };

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
            setModalState({ open: false, confirmLoading: false });
            void message.success(
                intl.formatMessage({
                    id: 'moduleList.deleteSuccessMessage',
                    defaultMessage: 'Modul erfolgreich gelöscht',
                    description: 'Module Delete success message',
                })
            );
        },
        onError: () => {
            setModalState({ open: false, confirmLoading: false });
            void message.error(
                intl.formatMessage({
                    id: 'moduleList.deleteErrorMessage',
                    defaultMessage: 'Modul konnte nicht gelöscht werden',
                    description: 'Module Delete Error Message',
                })
            );
        },
    });

    // Filter for the searchbar
    const onFilterTextBoxChanged = useCallback((value: string) => {
        if (gridRef.current) {
            gridRef.current.api.setQuickFilter(value);
        }
    }, []);

    if (isGetModuleError) return <div>Error when loading courses</div>;
    if (isGetModulePending) return <Spin />;

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
            cellRenderer: (params: { data: ModuleObject }) => (
                <DropdownCellRenderer data={params.data} menuItems={menuItems} />
            ),
        },
    ];

    // Function to generate menu items dynamically based on id
    const menuItems = (id: number, moduleDescription: string): MenuProps['items'] => [
        {
            key: 'edit',
            label: (
                <Link from={'/module'} to={ModuleDetailRoute.to} params={{ id }}>
                    <EditOutlined className={styles.iconTextSpaceBetween} />
                    {intl.formatMessage({
                        id: 'moduleList.edit',
                        defaultMessage: 'Editieren',
                        description: 'Menu item to copy a module',
                    })}
                </Link>
            ),
        },
        {
            key: 'copy',
            label: (
                <Link from={'/module'} to={CopyModuleRoute.to} params={{ id }}>
                    <CopyOutlined className={styles.iconTextSpaceBetween} />
                    {intl.formatMessage({
                        id: 'moduleList.copy',
                        defaultMessage: 'Kopieren',
                        description: 'Menu item to copy a module',
                    })}
                </Link>
            ),
        },
        {
            key: 'delete',
            label: (
                <div>
                    <Button
                        className={styles.deleteButton}
                        onClick={() => {
                            showModal(id, moduleDescription);
                        }}
                        icon={<DeleteOutlined />}
                    >
                        {intl.formatMessage({
                            id: 'moduleList.delete',
                            defaultMessage: 'Löschen',
                            description: 'Menu item to delete a module',
                        })}
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className={styles.moduleContainer}>
            <div className={styles.spaceBetweenButtonAndSearch}>
                <Link from={'/module'} to={'/module/new'}>
                    <Button type={'primary'}>
                        + &nbsp;
                        {intl.formatMessage({
                            id: 'moduleList.addModuleButton',
                            defaultMessage: 'Modul hinzufügen',
                            description: 'Button for creating a new module',
                        })}
                    </Button>
                </Link>

                <Search
                    placeholder={'Filter...'}
                    onChange={(e) => onFilterTextBoxChanged(e.target.value)}
                    className={styles.searchbar}
                />
            </div>
            <Grid<ModuleObject>
                gridRef={gridRef}
                rowData={moduleData}
                columnDefs={moduleColumnDefs}
                defaultColDef={defaultModuleColDef}
            />
            <Modal
                title={
                    <span>
                        <QuestionCircleOutlined style={{ marginRight: 8, color: 'red' }} />
                        {intl.formatMessage({ id: 'moduleList.delete' })}
                    </span>
                }
                open={modalState.open}
                onOk={handleOk}
                confirmLoading={modalState.confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </div>
    );
}
