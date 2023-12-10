import styles from '@features/course-admin/CourseCreation.module.scss';
import { CourseDetailForm, CourseFormData } from '@features/course-admin/CourseDetailForm.tsx';
import { ExamFormRow } from '@features/course-admin/ExamFormRow.tsx';
import { ExamResponse } from '@features/course-admin/interfaces/CourseData.ts';
import { FormFilters } from '@features/course-admin/interfaces/FormFilters.ts';
import { Button, Form, FormInstance, Spin } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import colors from '../../colors.module.scss';
import layout from '../../layout.module.scss';

interface ExamFormProps {
    courseFormFilterData: FormFilters | undefined;
    initialValues: Partial<CourseFormData>;
    onFinish: (formValues: CourseFormData) => void;
    form: FormInstance;
    courseExams: ExamResponse[];
}

export function ExamForm(props: Readonly<ExamFormProps>) {
    const initialTotalWeight = props.courseExams.reduce((acc, curr) => acc + curr.weight, 0);
    const [totalWeight, setTotalWeight] = useState(initialTotalWeight);
    const [exams, setExams] = useState(props.courseExams);
    console.info('examData:', exams);

    const handleDeleteField = (id: number) => {
        setExams((updatedExamData) => {
            return updatedExamData.filter((exam) => exam.id !== id);
        });
    };

    // Updates the total weight of all exams live on input change
    const onWeightChange = (rowIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newWeight = parseFloat(e.target.value);
        const updatedExams = exams.map((exam) => ({ ...exam }));
        updatedExams[rowIndex].weight = isNaN(newWeight) ? 0 : newWeight;

        const newTotal = updatedExams.reduce((acc, curr) => acc + curr.weight, 0);
        setExams(updatedExams);
        setTotalWeight(newTotal);
    };

    const addNewExamRow = () => {
        props.form
            .validateFields()
            .then(() => {
                // Create an empty exam data object
                const emptyExam: ExamResponse = {
                    // Add temporary id to rerender the list on delete
                    id: exams.length + 1,
                    description: '',
                    weight: 0,
                    type: '',
                };

                setExams([...exams, emptyExam]);
            })
            .catch((error) => {
                // Handle validation error if needed
                console.error('Validation failed:', error);
            });
    };

    return (
        <div className={styles.flexOverall}>
            <div className={styles.flexOneThird}>
                {props.courseFormFilterData ? (
                    <CourseDetailForm
                        form={props.form}
                        initialValues={props.initialValues}
                        onFinish={props.onFinish}
                        courseFormFilterData={props.courseFormFilterData}
                    />
                ) : (
                    <Spin />
                )}
            </div>

            <div
                style={{
                    backgroundColor: colors.colorBgContainerHighlight,
                    borderRadius: layout.borderRadius,
                }}
                className={styles.container + ' ' + styles.flexTwoThirds}
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
                    <Form form={props.form} name={'exam-form'}>
                        <div className={styles.divTable}>
                            <div className={styles.divTableRow}>
                                <div className={styles.divTableCell}>
                                    <FormattedMessage
                                        id={'course.Title'}
                                        defaultMessage={'Titel'}
                                        description={'Titel'}
                                    />
                                    <hr />
                                </div>
                                <div className={styles.divTableCell}>
                                    <FormattedMessage
                                        id={'course.QualificationCertificate'}
                                        defaultMessage={'Qualifikationsnachweis'}
                                        description={'Qualification Certificate'}
                                    />

                                    <hr />
                                </div>
                                <div className={styles.divTableCell}>
                                    <FormattedMessage
                                        id={'course.Weight'}
                                        defaultMessage={'Gewichtung'}
                                        description={'Qualification weight'}
                                    />

                                    <hr />
                                </div>
                            </div>

                            {exams.map((exam) => {
                                return (
                                    <ExamFormRow
                                        key={exam.id}
                                        exam={exam}
                                        onDeleteClick={handleDeleteField}
                                        rowIndex={exam.id}
                                        total={totalWeight}
                                        onWeightChange={onWeightChange}
                                    />
                                );
                            })}
                        </div>
                    </Form>
                </div>
                <Button type={'text'} onClick={addNewExamRow}>
                    <FormattedMessage
                        id={'course.ButtonAdd'}
                        defaultMessage={'+ Hinzufügen'}
                        description={'Qualifikation hinzufügen Button'}
                    />
                </Button>
            </div>
        </div>
    );
}
