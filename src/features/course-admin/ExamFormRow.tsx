import { DeleteOutlined } from '@ant-design/icons';
import { EmptyExam, ExamResponse } from '@features/course-admin/CourseCreation.tsx';
import { Button, Form, Input } from 'antd';

interface ExamFormRowProps {
    exam: ExamResponse | EmptyExam;
    rowIndex: number;
    onDeleteClick: (index: number) => void;
}

export function ExamFormRow({ exam, rowIndex, onDeleteClick }: ExamFormRowProps) {
    return (
        <div style={{ display: 'table-row' }} key={rowIndex}>
            <Form.Item
                name={`examDesignation-${rowIndex}`}
                initialValue={exam?.designation}
                style={{ display: 'table-cell', marginRight: '8px' }}
            >
                <Input type={'text'} />
            </Form.Item>
            <Form.Item
                name={`examType-${rowIndex}`}
                initialValue={exam?.type}
                style={{ display: 'table-cell', marginRight: '8px' }}
            >
                <Input type={'text'} />
            </Form.Item>
            <Form.Item
                name={`examWeight-${rowIndex}`}
                initialValue={exam?.weight}
                style={{ display: 'table-cell', marginRight: '8px' }}
            >
                <Input type={'text'} />
            </Form.Item>
            <Form.Item
                name={`examWeight-${rowIndex}`}
                initialValue={exam?.weight}
                style={{ display: 'table-cell', marginRight: '8px' }}
            />
            <div style={{ display: 'table-cell', alignItems: 'center' }}>
                <Button type={'text'} style={{ color: 'red' }} onClick={() => onDeleteClick(rowIndex)}>
                    <DeleteOutlined />
                </Button>
            </div>
        </div>
    );
}
