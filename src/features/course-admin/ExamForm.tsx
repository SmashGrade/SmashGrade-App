import { MaterialIcon } from '@components/ui-elements/MaterialIcon.tsx';
import styles from '@features/course-admin/CourseCreation.module.scss';
import { CourseFormData } from '@features/course-admin/CourseDetailForm.tsx';
import { ExamResponse } from '@features/course-admin/interfaces/CourseData.ts';
import { FormFilters } from '@features/course-admin/interfaces/FormFilters.ts';
import { Button, Col, Divider, Form, Input, InputNumber, Row } from 'antd';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import colors from '../../colors.module.scss';
import layout from '../../layout.module.scss';

interface ExamFormProps {
    courseFormFilterData: FormFilters | undefined;
    initialValues: Partial<CourseFormData>;
    courseExams: ExamResponse[];
}

export function ExamForm(props: Readonly<ExamFormProps>) {
    const initialTotalWeight = props.courseExams.reduce((acc, curr) => acc + curr.weight, 0);
    const [weights, setWeights] = useState({
        totalWeight: initialTotalWeight,
        weights: props.courseExams.map((exam) => exam.weight),
    });

    // Updates the total weight of all exams live on input change
    const onWeightChange = (rowIndex: number, newWeight: number | null) => {
        if (newWeight === null) {
            return;
        }
        const updatedWeights = weights.weights.map((weight, index) => (index === rowIndex ? newWeight : weight));
        const newTotal = updatedWeights.reduce((acc, curr) => acc + curr, 0);
        setWeights({ totalWeight: newTotal, weights: updatedWeights });
    };

    return (
        <div
            style={{
                backgroundColor: colors.colorBgContainerHighlight,
                borderRadius: layout.borderRadius,
            }}
            className={styles.container}
        >
            <p>
                <b>
                    <FormattedMessage
                        id={'course.QualificationCertificatesTitle'}
                        defaultMessage={'Qualifikationsnachweise'}
                        description={'Qualification Certificates Title'}
                    />
                </b>
            </p>

            <div>
                <Row gutter={16}>
                    <Col span={11}>
                        <FormattedMessage id={'course.Title'} defaultMessage={'Titel'} description={'Titel'} />
                    </Col>
                    <Col span={8}>
                        <FormattedMessage
                            id={'course.QualificationCertificate'}
                            defaultMessage={'Qualifikationsnachweis'}
                            description={'Qualification Certificate'}
                        />
                    </Col>
                    <Col span={4}>
                        <FormattedMessage
                            id={'course.Weight'}
                            defaultMessage={'Gewichtung'}
                            description={'Qualification weight'}
                        />
                    </Col>
                </Row>
                <Divider />

                <Form.List name={'exams'}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => {
                                return (
                                    <Row gutter={16} key={'row-' + field.key}>
                                        <Col span={11}>
                                            <Form.Item
                                                {...field}
                                                key={field.key + 'description'}
                                                name={[field.name, 'description']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing description',
                                                    },
                                                ]}
                                            >
                                                <Input type={'text'} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item {...field} key={field.key + 'type'} name={[field.name, 'type']}>
                                                <Input type={'text'} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}>
                                            <Form.Item name={[field.name, 'weight']}>
                                                <InputNumber
                                                    style={{ width: '100%' }}
                                                    min={1}
                                                    max={100}
                                                    onChange={(value: number | null) =>
                                                        onWeightChange(field.name, value)
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={1} style={{ verticalAlign: 'center', textAlign: 'center' }}>
                                            <div className={styles.weightContainer}>
                                                {`${weights.weights[field.name]}/${weights.totalWeight}`}
                                            </div>
                                        </Col>
                                        <Col span={2}>
                                            <Button
                                                onClick={() => {
                                                    setWeights((prev) => ({
                                                        totalWeight: prev.totalWeight - 1,
                                                        weights: prev.weights.filter(
                                                            (_, index) => index !== field.name
                                                        ),
                                                    }));

                                                    remove(field.name);
                                                }}
                                                type={'primary'}
                                            >
                                                <MaterialIcon icon={'delete'} size={'small'} />
                                            </Button>
                                        </Col>
                                    </Row>
                                );
                            })}
                            <Button
                                type={'dashed'}
                                onClick={() => {
                                    setWeights((prev) => ({
                                        totalWeight: prev.totalWeight + 1,
                                        weights: [...prev.weights, 1],
                                    }));

                                    add({
                                        id: props.courseExams.length
                                            ? props.courseExams[props.courseExams.length - 1].id + 1
                                            : 1,
                                        description: '',
                                        type: '',
                                        weight: 1,
                                    });
                                }}
                            >
                                Add Exam
                            </Button>
                        </>
                    )}
                </Form.List>
            </div>
        </div>
    );
}
