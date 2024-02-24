import { CopyOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import DropdownCellRenderer from '@components/grid/DropdownCellRenderer.tsx';
import Grid from '@components/grid/Grid.tsx';
import DeleteModal from '@components/grid/ModalDeletePrompt.tsx';
import StatusCellRenderer from '@components/grid/StatusCellRenderer.tsx';
import { Spinner } from '@components/ui-elements/Spinner.tsx';
import { ModuleObject, ModuleResponseNew } from '@features/course-admin/interfaces/ModuleData.ts';
import { deleteModuleById, getModules } from '@features/course-admin/module/moduleApi.ts';
import { LinkButtonCellRenderer } from '@features/course/LinkButtonCellRenderer.tsx';
import { Route as ModuleIndexRoute } from '@routes/module/index.route.tsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import type { MenuProps } from 'antd';
import { Button, Input, message, Modal } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Route as ModuleDetailRoute } from '../../../routes/module/$id.tsx';
import { Route as CopyModuleRoute } from '../../../routes/module/copy.$id.tsx';
import styles from './ModuleList.module.scss';

const { Search } = Input;

const defaultModuleColDef: ColDef<ModuleResponseNew> = {
    sortable: true,
    filter: 'agTextColumnFilter',
};

export default function ModuleList() {
    const gridRef = useRef<AgGridReact>(null);
    const queryClient = useQueryClient();

    const intl = useIntl();

    // States for the Modal Delete Popup
    const [moduleIdToDelete, setModuleIdToDelete] = useState<number | null>(null);
    const [modalState, setModalState] = useState({
        open: false,
        confirmLoading: false,
    });
    const [modalText, setModalText] = useState<React.ReactNode | undefined>();

    const renderDeleteModal = (id: number, moduleDescription: string) => (
        <DeleteModal id={id} description={moduleDescription} showModal={showModal} />
    );

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
    if (isGetModulePending) return <Spinner />;

    const moduleColumnDefs: ColDef<ModuleResponseNew>[] = [
        {
            field: 'id',
            headerName: '',
            cellRenderer: LinkButtonCellRenderer,
            cellRendererParams: {
                from: ModuleIndexRoute.to,
                to: ModuleDetailRoute.to,
            },
        },
        { field: 'number', headerName: 'Nummer', flex: 1 },
        { field: 'description', headerName: 'Module', flex: 1 },
        { field: 'studyStage.description', headerName: 'Studiumsphase', flex: 1 },
        {
            field: 'valuationCategory.description',
            headerName: 'Bewertungskategorie',
        },
        {
            field: 'isActive',
            headerName: 'Status',
            cellStyle: { textAlign: 'center' },
            cellRenderer: StatusCellRenderer,
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
                <DropdownCellRenderer<ModuleObject> data={params.data} menuItems={menuItems} />
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
            label: renderDeleteModal(id, moduleDescription),
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
            <Grid<ModuleResponseNew>
                gridRef={gridRef}
                rowData={moduleData}
                columnDefs={moduleColumnDefs}
                defaultColDef={defaultModuleColDef}
            />
            <Modal
                title={
                    <span>
                        <QuestionCircleOutlined style={{ marginRight: 8, color: 'red' }} />
                        {intl.formatMessage({
                            id: 'moduleList.delete',
                            defaultMessage: 'Löschen',
                            description: 'Curriculum Modal delete',
                        })}
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
