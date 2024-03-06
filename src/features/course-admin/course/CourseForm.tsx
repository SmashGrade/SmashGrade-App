import { SaveOutlined } from '@ant-design/icons';
import { CourseObject } from '@components/api/interfaces/Course.ts';
import { MaterialIcon } from '@components/ui-elements/MaterialIcon.tsx';
import { Spinner } from '@components/ui-elements/Spinner.tsx';
import { getCourseFilter } from '@features/course-admin/course/courseApi.ts';
import { CourseDetailForm, CourseFormData } from '@features/course-admin/course/CourseDetailForm.tsx';
import { ExamForm } from '@features/course-admin/course/ExamForm.tsx';
import { CourseCreationRequest, CourseUpdateRequest } from '@features/course-admin/interfaces/CourseData.ts';

import { UseMutationResult, useQuery } from '@tanstack/react-query';
import { Button, Form, Select, Space } from 'antd';
import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './CourseCreation.module.scss';

const validateMessages = {
    required: '${label} is required!',
};

interface CourseFormEditProps {
    courseData: CourseObject;
    newCourse?: false;
    mutation: UseMutationResult<void, Error, CourseUpdateRequest, unknown>;
}

interface CourseFormNewProps {
    courseData: CourseCreationRequest;
    newCourse: true;
    mutation: UseMutationResult<void, Error, CourseCreationRequest, unknown>;
}

type CourseFormProps = CourseFormEditProps | CourseFormNewProps;

export default function CourseForm(props: Readonly<CourseFormProps>) {
    const [courseForm] = Form.useForm();

    const {
        isLoading: isCourseFormFilterLoading,
        error: courseFormFilterError,
        data: courseFormFilterData,
    } = useQuery({
        queryKey: ['formFilters'],
        queryFn: getCourseFilter,
    });

    const onCourseFormFinish = useCallback(
        (formValues: CourseFormData) => {
            if (!courseFormFilterData) {
                console.error('courseFilter is not defined');
                return;
            }

            // Get an array of teacher objects from the teacher ids from the form (will be removed later when real backend is there since it will only need the ID's)
            const teachers = formValues.teachers.map((teacherId) => {
                const teacher = courseFormFilterData.teachers.find((teacher) => teacher.id === teacherId);
                if (!teacher) {
                    throw new Error(`Teacher with id ${teacherId} not found`);
                }
                return teacher;
            });

            // Get an array of module objects from the module ids from the form (will be removed later when real backend is there since it will only need the ID's)
            const modules = formValues.modules.map((moduleId) => {
                const module = courseFormFilterData.modules.find((module) => module.id === moduleId);
                if (!module) {
                    throw new Error(`Module with id ${moduleId} not found`);
                }
                return module;
            });

            let payload: CourseUpdateRequest | CourseCreationRequest;
            if (props.newCourse) {
                payload = {
                    version: 1,
                    description: formValues.description,
                    number: formValues.number,
                    modules: modules,
                    teachers: teachers,
                    exams: formValues.exams,
                    versions: [1, 2, 3],
                };
                props.mutation.mutate(payload);
            } else {
                payload = {
                    id: props.courseData.id,
                    version: 1,
                    description: formValues.description,
                    number: formValues.number,
                    modules: modules,
                    teachers: teachers,
                    exams: formValues.exams,
                    versions: [1, 2, 3],
                };
                props.mutation.mutate(payload);
            }
        },
        [courseFormFilterData, props.courseData, props.mutation, props.newCourse]
    );

    const onSave = useCallback(() => {
        courseForm.submit();
    }, [courseForm]);

    if (courseFormFilterError) return <div>Error when loading filters</div>;
    if (isCourseFormFilterLoading) return <Spinner />;

    const initialData: Partial<CourseFormData> = {
        description: props.courseData.description,
        number: props.courseData.number,
        teachers: props.courseData.teachedBy.map((teacher) => teacher.id),
        modules: props.courseData.modules.map((module) => module.id),
        exams: props.courseData.exams,
    };

    return (
        <div className={styles.overallFlex}>
            <div className={styles.flexEnd}>
                <div className={styles.title}>
                    <MaterialIcon icon={'collections_bookmark'} />
                    <h2>
                        <FormattedMessage
                            id={'courseDetail.Title'}
                            defaultMessage={'Kurs'}
                            description={'Kursdetail Titel'}
                        />
                    </h2>
                </div>

                <Space wrap>
                    <Select
                        className={styles.version}
                        defaultValue={props.courseData?.version?.toString()}
                        options={props.courseData?.versions.map((version) => ({
                            value: version.toString(),
                            label: `v${version}`,
                        }))}
                    />
                </Space>
            </div>

            {props.courseData && (
                <Form<CourseFormData>
                    name={'courseForm'}
                    layout={'vertical'}
                    form={courseForm}
                    validateMessages={validateMessages}
                    initialValues={initialData}
                    onFinish={onCourseFormFinish}
                    style={{ width: '100%' }}
                >
                    <div className={styles.flexOverall}>
                        {courseFormFilterData ? (
                            <div className={styles.flexOneThird}>
                                <CourseDetailForm
                                    form={courseForm}
                                    initialValues={initialData}
                                    onFinish={onCourseFormFinish}
                                    courseFormFilterData={courseFormFilterData}
                                />
                            </div>
                        ) : (
                            <Spinner />
                        )}
                        <div className={styles.flexTwoThirds}>
                            <ExamForm
                                courseFormFilterData={courseFormFilterData}
                                initialValues={initialData}
                                courseExams={props.courseData.exams}
                            />
                        </div>
                    </div>
                </Form>
            )}

            <div className={styles.divButtons}>
                <Button type={'primary'} className={styles.buttons}>
                    <FormattedMessage
                        id={'course.ButtonCancel'}
                        defaultMessage={'Abbrechen'}
                        description={'Abbrechen Button'}
                    />
                </Button>

                <Button type={'primary'} icon={<SaveOutlined />} className={styles.buttons} onClick={onSave}>
                    <FormattedMessage
                        id={'course.ButtonSave'}
                        defaultMessage={'Speichern'}
                        description={'Speichern Button'}
                    />
                </Button>
            </div>
        </div>
    );
}
