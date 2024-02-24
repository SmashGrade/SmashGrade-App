import { CurriculumCreateRequest, CurriculumResponseNew } from '@features/course-admin/interfaces/CurriculumData.ts';
import { UseMutationResult } from '@tanstack/react-query';
import { Button, Form, Select, Switch, DatePicker, Row, Col } from 'antd';
import { useCallback } from 'react';
import styles from './CurriculumForm.module.scss';

export const DATE_FORMAT = 'DD.MM.YYYY';

export interface CurriculumForm {
    number: string;
    description: string;
    focusOption: string;
    module: string[];
    isActive: boolean;
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

const focusOptions = [
    { label: 'Focus 1', value: 'focus1' },
    { label: 'Focus 2', value: 'focus2' },
    // add more options as needed
];

const fieldOptions = [
    { label: 'Field 1', value: 'field1' },
    { label: 'Field 2', value: 'field2' },
    // add more options as needed
];

const typeOptions = [
    { label: 'Type 1', value: 'type1' },
    { label: 'Type 2', value: 'type2' },
    // add more options as needed
];

const teacherOptions = [
    { label: 'Daniel Rutz', value: 'DanielRutz' },
    { label: 'Kurt Munter', value: 'KurtMunter' },
    // add more options as needed
];

export function CurriculumForm({ curriculumData, mutation, newCurriculum }: Readonly<CurriculumFormProps>) {
    const [curriculumForm] = Form.useForm();

    const initialFormValues: CurriculumForm = {
        ...curriculumData,
        /*focusOptions: curriculumData.valuationCategory.code,*/
        focusOption: curriculumData.focusOption.id,
        module: [],
    };

    const onCurriculumFormFinish = useCallback(
        (formValues: CurriculumForm) => {
            if (newCurriculum) {
                /*const evaluationCategory: = evaluationCategories.find(
                    (category) => category.value === formValues.focusOptions
                ) ?? {
                    label: '',
                    value: '',
                };*/

                const focusOption = focusOptions.find((focus) => focus.value === formValues.focusOption) ?? {
                    label: 'None',
                    value: '',
                };
                const payload: CurriculumCreateRequest = {
                    ...formValues,
                    version: 1,
                    /*valuationCategory: {
                        code: evaluationCategory.value,
                        description: evaluationCategory.label,
                    },*/
                    focusOption: {
                        id: focusOption.value,
                        description: focusOption.label,
                    },
                    modules: [],
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
                        <Select options={focusOptions} />
                    </Form.Item>
                    <Form.Item label={'Field'} name={'field'}>
                        <Select options={fieldOptions} />
                    </Form.Item>
                    <Form.Item label={'Type'} name={'type'}>
                        <Select options={typeOptions} />
                    </Form.Item>
                    <Form.Item label={'Teacher'} name={'teacher'}>
                        <Select mode={'multiple'} options={teacherOptions} />
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
                    <Form.Item label={'Status'} name={'status'}>
                        <Switch checkedChildren={'Active'} unCheckedChildren={'Inactive'} />
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
