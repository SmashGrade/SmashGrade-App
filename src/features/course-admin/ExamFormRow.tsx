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
        <div style={{ display: 'flex', justifyContent: 'space-between' }} key={rowIndex}>
            <Form.Item
                name={`examDesignation-${rowIndex}`}
                initialValue={exam?.designation}
                style={{ flex: 1, marginRight: '8px', marginBottom: '0px' }}
            >
                <Input type={'text'} />
            </Form.Item>
            <Form.Item
                name={`examType-${rowIndex}`}
                initialValue={exam?.type}
                style={{ flex: 1, marginRight: '8px', marginBottom: '0px' }}
            >
                <Input type={'text'} />
            </Form.Item>
            <Form.Item
                name={`examWeight-${rowIndex}`}
                initialValue={exam?.weight}
                style={{ flex: 1, marginRight: '8px', marginBottom: '0px' }}
            >
                <Input type={'text'} />
            </Form.Item>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button type={'text'} style={{ color: 'red' }} onClick={() => onDeleteClick(rowIndex)}>
                    <DeleteOutlined />
                </Button>
            </div>
        </div>
    );
}
