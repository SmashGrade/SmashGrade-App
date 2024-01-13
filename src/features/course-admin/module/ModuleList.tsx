import Grid from '@components/Grid.tsx';
import DropdownCellRenderer from '@components/grid/DropdownCellRenderer.tsx';
import StatusCellRenderer from '@components/grid/StatusCellRenderer.tsx';
import { copyModuleRoute, moduleDetailRoute, newModuleRoute } from '@pages/routes/moduleRoutes.ts';
import { moduleRoute } from '@pages/routes/routes.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { Button, Spin, Input, message, Modal } from 'antd';
import type { MenuProps } from 'antd';
import { EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { useCallback, useRef, useState } from 'react';
import styles from './ModuleList.module.scss';
import { FormattedMessage } from 'react-intl';
import { ModuleObject } from '@features/course-admin/interfaces/ModuleData.ts';
import { getModules, deleteModuleById } from '@features/course-admin/module/moduleApi.ts';

const { Search } = Input;

const defaultModuleColDef: ColDef<ModuleObject> = { sortable: true, filter: 'agTextColumnFilter' };

export default function ModuleList() {
    const gridRef = useRef<AgGridReact>(null);
    const queryClient = useQueryClient();

    // States for the Modal Delete Popup
    const [moduleIdToDelete, setModuleIdToDelete] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');

    const showModal = (id: number) => {
        setOpen(true);
        setModuleIdToDelete(id);
        //console.log('show Modal');
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        if (moduleIdToDelete !== null) {
            setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
                deleteModuleMutation.mutate(moduleIdToDelete);
            }, 3000);
        }
    };

    const handleCancel = () => {
        setOpen(false);
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
            void message.success(
                <FormattedMessage
                    id={'moduleList.deleteSuccessMessage'}
                    description={'Module Delete success message'}
                    defaultMessage={'Modul erfolgreich gelöscht'}
                />
            );
        },
    });

    /*const handleDelete = (id: number) => {
            // Call the mutation function with the module id
            deleteModuleMutation.mutate(id);
        };*/

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
            cellRenderer: (params: { data: ModuleObject }) => (
                <DropdownCellRenderer data={params.data} menuItems={menuItems} />
            ),
        },
    ];

    // Function to generate menu items dynamically based on id
    const menuItems = (id: number): MenuProps['items'] => [
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
                <div>
                    <Button
                        className={styles.deleteButton}
                        onClick={() => {
                            showModal(id);
                        }}
                        icon={<DeleteOutlined className={styles.iconTextSpaceBetween} />}
                    >
                        <FormattedMessage
                            id={'moduleList.delete'}
                            defaultMessage={'Löschen'}
                            description={'Menu item to delete a module'}
                        />
                    </Button>
                    <Modal
                        title={'Title'}
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <p>{modalText}</p>
                    </Modal>
                </div>
            ),
        },
    ];

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
        </div>
    );
}
