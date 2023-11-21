import { DeleteOutlined } from '@ant-design/icons';
import { EmptyExam, ExamResponse } from '@features/course-admin/CourseCreation.tsx';
import { Button, Form, Input } from 'antd';
import styles from './ExamFormRow.module.scss';

interface ExamFormRowProps {
    exam: ExamResponse | EmptyExam;
    rowIndex: number;
    total: number;
    onDeleteClick: (index: number) => void;
}

export function ExamFormRow({ exam, rowIndex, total, onDeleteClick }: ExamFormRowProps) {
    return (
        <div className={styles.divTableRow} key={rowIndex}>
            <Form.Item
                name={`examDesignation-${rowIndex}`}
                initialValue={exam?.designation}
                className={styles.tableCell}
            >
                <Input type={'text'} />
            </Form.Item>
            <Form.Item name={`examType-${rowIndex}`} initialValue={exam?.type} className={styles.tableCell}>
                <Input type={'text'} />
            </Form.Item>
            <Form.Item
                name={`examWeight-${rowIndex}`}
                initialValue={exam?.weight}
                className={`${styles.tableCell} ${styles.divWeightSize}`}
            >
                <Input type={'text'} />
            </Form.Item>
            /{total}
            <div className={styles.divTableCell}>
                <Button type={'text'} className={styles.iconColor} onClick={() => onDeleteClick(rowIndex)}>
                    <DeleteOutlined />
                </Button>
            </div>
        </div>
    );
}
