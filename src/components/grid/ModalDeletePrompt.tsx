// DeleteModal.tsx

import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './ModalDeletePompt.module.scss';
import { useIntl } from 'react-intl'; // Add missing import statement for useIntl

interface DeleteModalProps {
    id: number;
    description: string;
    showModal: (id: number, description: string) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id, description, showModal }) => {
    const intl = useIntl(); // Add useIntl hook

    return (
        <div>
            <Button
                className={styles.deleteButton}
                onClick={() => {
                    showModal(id, description);
                }}
                icon={<DeleteOutlined />}
            >
                {intl.formatMessage({
                    // Replace Intl with intl
                    id: 'curriculumList.delete',
                    defaultMessage: 'Löschen',
                    description: 'Menu item to delete a curriculum',
                })}
            </Button>
        </div>
    );
};

export default DeleteModal;
