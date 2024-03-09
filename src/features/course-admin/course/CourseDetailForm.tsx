import styles from '@features/course-admin/course/CourseCreation.module.scss';
import { ExamCreateData } from '@features/course-admin/interfaces/CourseData.ts';
import { FormFilters } from '@features/course-admin/interfaces/FormFilters.ts';
import { Form, FormInstance, Input, Select } from 'antd';
import { useIntl } from 'react-intl';
import colors from '../../../colors.module.scss';
import layout from '../../../layout.module.scss';

export interface CourseFormData {
    description: string;
    number: string;
    modules: number[]; // Array of module ids
    teachers: number[]; // Array of teacher ids
    exams: ExamCreateData[];
}

interface CourseDetailFormProps {
    form: FormInstance<CourseFormData>;
    onFinish: (formValues: CourseFormData) => void;
    courseFormFilterData: FormFilters;
}

export function CourseDetailForm(props: Readonly<CourseDetailFormProps>) {
    const intl = useIntl();
    return (
        <>
            <Form.Item
                name={'description'}
                label={intl.formatMessage({
                    id: 'courseForm.description',
                    defaultMessage: 'Kurs',
                    description: 'Kurs Name',
                })}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input type={'text'} />
            </Form.Item>
            <Form.Item
                name={'number'}
                label={intl.formatMessage({
                    id: 'courseForm.number',
                    defaultMessage: 'Nummer',
                    description: 'Kurs Nummer',
                })}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={'teachers'}
                label={intl.formatMessage({
                    id: 'courseForm.teachers',
                    defaultMessage: 'Dozent(en)',
                    description: 'Name Dozent',
                })}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    mode={'multiple'}
                    allowClear
                    className={styles.spacerWidth}
                    options={props.courseFormFilterData?.teacherOptions}
                />
            </Form.Item>

            <div
                style={{
                    backgroundColor: colors.colorBgContainerHighlight,
                    borderRadius: layout.borderRadius,
                }}
                className={styles.container}
            >
                <Form.Item
                    name={'modules'}
                    label={intl.formatMessage({
                        id: 'courseForm.modules',
                        defaultMessage: 'Modul(e)',
                        description: 'Module Title',
                    })}
                >
                    <Select
                        mode={'multiple'}
                        allowClear
                        className={styles.spacerWidth}
                        options={props.courseFormFilterData?.moduleOptions}
                    />
                </Form.Item>
            </div>
        </>
    );
}
