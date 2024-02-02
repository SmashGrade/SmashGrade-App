import { CopyOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import DropdownCellRenderer from '@components/grid/DropdownCellRenderer.tsx';
import Grid from '@components/grid/Grid.tsx';
import DeleteModal from '@components/grid/ModalDeletePrompt.tsx';
import StatusCellRenderer from '@components/grid/StatusCellRenderer.tsx';
import { formatDate } from '@components/ui-elements/FormatDate.ts';
import { deleteCurriculumById, getCurriculums } from '@features/course-admin/curriculum/curriculumApi.ts';
import { CurriculumObject } from '@features/course-admin/interfaces/CurriculumData.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import type { MenuProps } from 'antd';
import { Button, Input, message, Modal, Spin } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { Route as CurriculumDetailRoute } from '../../../routes/curriculum/$id.tsx';
import { Route as CopyCurriculumRoute } from '../../../routes/curriculum/copy.$id.tsx';
import styles from './CurriculumList.module.scss';

const { Search } = Input;

const defaultCurriculumColDef: ColDef<CurriculumObject> = { sortable: true, filter: 'agTextColumnFilter' };

class ModalDeletePrompt extends React.Component<{
    intl: IntlShape;
    modalState: { confirmLoading: boolean; open: boolean };
    onOk: () => void;
    onCancel: () => void;
    modalText: React.ReactNode | undefined;
}> {
    render() {
        return (
            <Modal
                title={
                    <span>
                        <QuestionCircleOutlined style={{ marginRight: 8, color: 'red' }} />
                        {this.props.intl.formatMessage({
                            id: 'curriculumList.delete',
                            defaultMessage: 'Löschen',
                            description: 'Curriculum Modal delete',
                        })}
                    </span>
                }
                open={this.props.modalState.open}
                onOk={this.props.onOk}
                confirmLoading={this.props.modalState.confirmLoading}
                onCancel={this.props.onCancel}
            >
                <p>{this.props.modalText}</p>
            </Modal>
        );
    }
}

export default function CurriculumList() {
    const gridRef = useRef<AgGridReact>(null);
    const queryClient = useQueryClient();

    const intl = useIntl();

    // States for the Modal Delete Popup
    const [curriculumIdToDelete, setCurriculumIdToDelete] = useState<number | null>(null);
    const [modalState, setModalState] = useState({ open: false, confirmLoading: false });
    const [modalText, setModalText] = useState<React.ReactNode | undefined>();

    const renderDeleteModal = (id: number, curriculumDescription: string) => (
        <DeleteModal id={id} description={curriculumDescription} showModal={showModal} />
    );

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterTextBoxChanged(e.target.value);
    };

    const showModal = (id: number, curriculumDescription: string) => {
        const message = (
            <>
                {intl.formatMessage({
                    id: 'curriculumList.deleteMessage',
                    defaultMessage: 'Möchtest du den Studiengang wirklich löschen?',
                    description: 'Modal Message to confirm the deletion',
                })}
                <br />
                <strong>{curriculumDescription}</strong>
            </>
        );

        setModalText(message);
        setModalState({ ...modalState, open: true });
        setCurriculumIdToDelete(id);
    };

    const handleOk = () => {
        setModalState({ ...modalState, confirmLoading: true });
        if (curriculumIdToDelete !== null) {
            deleteCurriculumMutation.mutate(curriculumIdToDelete);
        }
    };

    const handleCancel = () => {
        setModalState({ ...modalState, open: false });
    };

    const {
        isLoading: isGetCurriculumPending,
        isError: isGetCurriculumError,
        data: curriculumData,
    } = useQuery({
        queryKey: ['curriculums'],
        queryFn: getCurriculums,
    });

    const deleteCurriculumMutation = useMutation({
        mutationFn: deleteCurriculumById,
        onError: () => {
            setModalState({ open: false, confirmLoading: false });
            void message.error(
                intl.formatMessage({
                    id: 'curriculumList.deleteErrorMessage',
                    defaultMessage: 'Studiengang konnte nicht gelöscht werden',
                    description: 'Modal Delete Error Message',
                })
            );
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['curriculums'] });
            setModalState({ open: false, confirmLoading: false });
            void message.success(
                intl.formatMessage({
                    id: 'curriculumList.deleteSuccessMessage',
                    defaultMessage: 'Studiengang erfolgreich gelöscht',
                    description: 'Curriculum Delete success message',
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

    if (isGetCurriculumError) return <div>Error when loading curriculums</div>;
    if (isGetCurriculumPending) return <Spin />;

    const curriculumColumnDefs: ColDef<CurriculumObject>[] = [
        { field: 'focus', headerName: 'Studiengang', flex: 1 },
        {
            field: 'fieldmanagers',
            headerName: 'Fachbereichsleiter',
            flex: 1,
            valueFormatter: (params) =>
                Array.isArray(params.value)
                    ? params.value.map((manager: { name: string }) => manager.name).join(', ')
                    : '',
        },
        {
            field: 'startDate',
            headerName: 'Von',
            valueFormatter: (params) => (typeof params.value === 'string' ? formatDate(params.value) : ''),
        },
        {
            field: 'endDate',
            headerName: 'Bis',
            valueFormatter: (params) => (typeof params.value === 'string' ? formatDate(params.value) : ''),
        },
        { field: 'curriculumType', headerName: 'Typ', flex: 1 },
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
            cellRenderer: (params: { data: CurriculumObject }) => (
                <DropdownCellRenderer<CurriculumObject> data={params.data} menuItems={menuItems} />
            ),
        },
    ];

    // Function to generate menu items dynamically based on id
    const menuItems = (id: number, curriculumDescription: string): MenuProps['items'] => [
        {
            key: 'edit',
            label: (
                <Link from={'/curriculum'} to={CurriculumDetailRoute.to} params={{ id }}>
                    <EditOutlined className={styles.iconTextSpaceBetween} />
                    {intl.formatMessage({
                        id: 'curriculum.edit',
                        defaultMessage: 'Editieren',
                        description: 'Menu item to copy a curriculum',
                    })}
                </Link>
            ),
        },
        {
            key: 'copy',
            label: (
                <Link from={'/curriculum'} to={CopyCurriculumRoute.to} params={{ id }}>
                    <CopyOutlined className={styles.iconTextSpaceBetween} />
                    {intl.formatMessage({
                        id: 'curriculumList.copy',
                        defaultMessage: 'Kopieren',
                        description: 'Menu item to copy a curriculum',
                    })}
                </Link>
            ),
        },
        {
            key: 'delete',
            label: renderDeleteModal(id, curriculumDescription),
        },
    ];

    return (
        <div className={styles.curriculumContainer}>
            <div className={styles.spaceBetweenButtonAndSearch}>
                <Link from={'/curriculum'} to={'/curriculum/new'}>
                    <Button type={'primary'}>
                        + &nbsp;
                        {intl.formatMessage({
                            id: 'curriculumList.addCurriculumButton',
                            defaultMessage: 'Studiengang hinzufügen',
                            description: 'Button for creating a new curriculum',
                        })}
                    </Button>
                </Link>

                <Search placeholder={'Filter...'} onChange={handleFilterChange} className={styles.searchbar} />
            </div>
            <Grid<CurriculumObject>
                gridRef={gridRef}
                rowData={curriculumData}
                columnDefs={curriculumColumnDefs}
                defaultColDef={defaultCurriculumColDef}
            />
            <ModalDeletePrompt
                intl={intl}
                modalState={modalState}
                onOk={handleOk}
                onCancel={handleCancel}
                modalText={modalText}
            />
        </div>
    );
}
