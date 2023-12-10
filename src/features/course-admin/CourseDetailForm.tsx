import styles from '@features/course-admin/CourseCreation.module.scss';
import { ExamCreateData } from '@features/course-admin/interfaces/CourseData.ts';
import { Form, FormInstance, Input, Select, SelectProps } from 'antd';
import { FormattedMessage } from 'react-intl';
import colors from '../../colors.module.scss';
import layout from '../../layout.module.scss';

export interface CourseFormData {
    description: string;
    number: string;
    modules: number[]; // Array of module ids
    teachers: number[]; // Array of teacher ids
    exams: ExamCreateData[];
}

interface CourseDetailFormProps {
    form: FormInstance<CourseFormData>;
    initialValues: Partial<CourseFormData>;
    onFinish: (formValues: CourseFormData) => void;
    courseFormFilterData: { modules: SelectProps['options'] | undefined; teachers: SelectProps['options'] | undefined };
}

export function CourseDetailForm(props: Readonly<CourseDetailFormProps>) {
    return (
        <Form<CourseFormData>
            layout={'vertical'}
            form={props.form}
            initialValues={props.initialValues}
            onFinish={props.onFinish}
        >
            <Form.Item
                name={'description'}
                label={<FormattedMessage id={'course.Course'} defaultMessage={'Kurs'} description={'Kurs Name'} />}
                rules={[
                    {
                        required: true,
                        message: '${label}',
                    },
                ]}
            >
                <Input type={'text'} />
            </Form.Item>
            <Form.Item
                name={'number'}
                label={<FormattedMessage id={'course.Number'} defaultMessage={'Nummer'} description={'Kurs Nummer'} />}
                rules={[
                    {
                        required: true,
                        message: '${label}',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={'teachers'}
                label={
                    <div>
                        <FormattedMessage
                            id={'course.LecturerTitle'}
                            defaultMessage={'Dozent(en)'}
                            description={'Name Dozent'}
                        />
                    </div>
                }
            >
                <Select
                    mode={'multiple'}
                    allowClear
                    className={styles.spacerWidth}
                    options={props.courseFormFilterData?.teachers}
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
                    label={
                        <p>
                            <FormattedMessage
                                id={'course.ModuleTitle'}
                                defaultMessage={'Modul(e)'}
                                description={'Module Title'}
                            />
                        </p>
                    }
                >
                    <Select
                        mode={'multiple'}
                        allowClear
                        className={styles.spacerWidth}
                        options={props.courseFormFilterData?.modules}
                    />
                </Form.Item>
            </div>
        </Form>
    );
}
