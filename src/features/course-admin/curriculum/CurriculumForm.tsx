import { CurriculumCreateRequest, CurriculumResponseNew } from '@features/course-admin/interfaces/CurriculumData.ts';
import { UseMutationResult } from '@tanstack/react-query';
import { Button, Form, Select, Switch, DatePicker, Row, Col } from 'antd';
import { useCallback } from 'react';
import styles from './CurriculumForm.module.scss';

export const DATE_FORMAT = 'DD.MM.YYYY';

export interface CurriculumForm {
    focus: {
        id: number;
        description: string;
    };
    field: {
        id: number;
        description: string;
    };
    curriculumType: {
        id: number;
        description: string;
    };
    isActive: boolean;
    startDate: string;
    endDate: string;
    fieldmanagers: {
        id: number;
        name: string;
    }[];
}

export interface CurriculumFormEditProps {
    curriculumData: CurriculumResponseNew;
    newCurriculum?: false;
    mutation: UseMutationResult<void, Error, CurriculumResponseNew, unknown>;
}

export interface CurriculumFormNewProps {
    curriculumData: CurriculumResponseNew;
    newCurriculum: true;
    mutation: UseMutationResult<void, Error, CurriculumCreateRequest, unknown>;
}

type CurriculumFormProps = CurriculumFormEditProps | CurriculumFormNewProps;

const focus = [
    { label: 'Focus 1', value: 1 },
    { label: 'Focus 2', value: 2 },
    // add more options as needed
];

const field = [
    { label: 'Field 1', value: 1 },
    { label: 'Field 2', value: 2 },
    // add more options as needed
];

const curriculumType = [
    { label: 'Type 1', value: 1 },
    { label: 'Type 2', value: 2 },
    // add more options as needed
];

const fieldmanagers = [
    { label: 'Daniel Rutz', value: 1 },
    { label: 'Kurt Munter', value: 2 },
    // add more options as needed
];

export function CurriculumForm({ curriculumData, mutation, newCurriculum }: Readonly<CurriculumFormProps>) {
    const [curriculumForm] = Form.useForm();

    const initialFormValues: CurriculumForm = {
        ...curriculumData,
        focus: curriculumData.focus,
        field: curriculumData.field,
        curriculumType: curriculumData.curriculumType,
        fieldmanagers: curriculumData.fieldmanagers.map((t: { id: number; name: string }) => ({
            id: t.id,
            name: t.name,
        })),
    };

    const onCurriculumFormFinish = useCallback(
        (formValues: CurriculumForm) => {
            if (newCurriculum) {
                const payload: CurriculumCreateRequest = {
                    ...formValues,
                    focus: {
                        id: focus[0].value,
                        description: focus[0].label,
                    },
                    field: {
                        id: field[0].value,
                        description: field[0].label,
                    },
                    curriculumType: {
                        id: curriculumType[0].value,
                        description: curriculumType[0].label,
                    },
                    fieldmanagers: fieldmanagers.map((f) => ({
                        id: f.value,
                        name: f.label,
                    })),
                };
                mutation.mutate(payload);
            }
        },
        [mutation, newCurriculum]
    );

    return (
        <div className={styles.curriculumFormContainer}>
            <div className={styles.form}>
                <h2>Studiengang</h2>
                <Form<CurriculumForm>
                    form={curriculumForm}
                    layout={'vertical'}
                    initialValues={initialFormValues}
                    onFinish={onCurriculumFormFinish}
                >
                    <Form.Item label={'Focus'} name={'focus'}>
                        <Select options={focus} />
                    </Form.Item>
                    <Form.Item label={'Field'} name={'field'}>
                        <Select options={field} />
                    </Form.Item>
                    <Form.Item label={'Type'} name={'type'}>
                        <Select options={curriculumType} />
                    </Form.Item>
                    <Form.Item label={'Teacher'} name={'fieldmanagers'}>
                        <Select mode={'multiple'} options={fieldmanagers} />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label={'Start Date'} name={'startDate'}>
                                <DatePicker format={DATE_FORMAT} className={styles.maxWidth} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={'End Date'} name={'endDate'}>
                                <DatePicker format={DATE_FORMAT} className={styles.maxWidth} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label={'Status'} name={'isActive'}>
                        <Switch checkedChildren={'isActive'} unCheckedChildren={'InActive'} />
                    </Form.Item>
                    <div className={styles.buttonContainer}>
                        <Button htmlType={'reset'}>Cancel</Button>
                        <Button type={'primary'} htmlType={'submit'}>
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
            <div className={styles.course}>
                <h2>Module</h2>
            </div>
        </div>
    );
}
