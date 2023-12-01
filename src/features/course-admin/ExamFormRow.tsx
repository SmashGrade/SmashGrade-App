import { DeleteOutlined } from '@ant-design/icons';
import { ExamResponse } from '@features/course-admin/interfaces/CourseData.ts';

import { Button, Form, Input } from 'antd';
import { ChangeEvent } from 'react';
import styles from './ExamFormRow.module.scss';

interface ExamFormRowProps {
    exam: ExamResponse;
    rowIndex: number;
    total: number;
    onWeightChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
    onDeleteClick: (index: number) => void;
}

import { Rule } from 'antd/lib/form';

const notNullValidator: Rule = {
    required: true,
    message: '!= null',
};

export function ExamFormRow({ exam, rowIndex, total, onWeightChange, onDeleteClick }: Readonly<ExamFormRowProps>) {
    return (
        <div className={styles.divTableRow} key={rowIndex}>
            <Form.Item
                name={`examDescrption-${rowIndex}`}
                initialValue={exam?.description}
                className={styles.tableCell}
                rules={[notNullValidator]}
            >
                <Input type={'text'} />
            </Form.Item>
            <Form.Item
                name={`examType-${rowIndex}`}
                initialValue={exam?.type}
                className={styles.tableCell}
                rules={[notNullValidator]}
            >
                <Input type={'text'} />
            </Form.Item>
            <Form.Item
                name={`examWeight-${rowIndex}`}
                initialValue={exam?.weight}
                className={`${styles.tableCell} ${styles.divWeightSize}`}
                rules={[
                    notNullValidator,
                    {
                        validator: (_, value) => {
                            if (value > 0) {
                                return Promise.resolve();
                            }
                            return Promise.reject('> 0');
                        },
                    },
                ]}
            >
                <Input type={'number'} onChange={(e) => onWeightChange(rowIndex, e)} />
            </Form.Item>
            /{total}
            <div className={`${styles.divTableCell} ${styles.divDeleteSize}`}>
                <Button type={'text'} className={styles.iconColor} onClick={() => onDeleteClick(rowIndex)}>
                    <DeleteOutlined />
                </Button>
            </div>
        </div>
    );
}
