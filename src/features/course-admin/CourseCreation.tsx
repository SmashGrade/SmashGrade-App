import { SaveOutlined } from '@ant-design/icons';
import { MaterialIcon } from '@components/ui-elements/MaterialIcon.tsx';
import { getCourse, getCourseFormFilters, updateCourse } from '@features/course-admin/courseCreationApi.ts';
import { CourseDetailForm, CourseFormData } from '@features/course-admin/CourseDetailForm.tsx';
import { ExamForm } from '@features/course-admin/ExamForm.tsx';
import { CourseResponse, CourseUpdateRequest } from '@features/course-admin/interfaces/CourseData.ts';
import { courseDetailRoute } from '@pages/routes/courseRoutes.ts';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Button, Form, Select, Space, Spin } from 'antd';
import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './CourseCreation.module.scss';

export default function CourseCreation() {
    const queryClient = useQueryClient();

    const [courseForm] = Form.useForm();
    const updateCourseMutation = useMutation({
        mutationFn: updateCourse,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['courses'] });
        },
    });

    const { id } = useParams({ from: courseDetailRoute.id });
    const courseId = id ?? 1;

    const {
        isLoading: isCourseLoading,
        error: isCourseError,
        data: courseData,
    } = useQuery<CourseResponse>({
        queryKey: ['courses'],
        queryFn: () => getCourse(courseId),
    });

    const {
        isLoading: isCourseFormFilterLoading,
        error: courseFormFilterError,
        data: courseFormFilterData,
    } = useQuery({
        queryKey: ['formFilters'],
        queryFn: getCourseFormFilters,
    });

    const onCourseFormFinish = useCallback(
        (formValues: CourseFormData) => {
            console.info('formValues:', formValues);

            // Create the payload for your API request
            const payload: CourseUpdateRequest = {
                id: courseId,
                version: 1,
                description: formValues.description,
                number: formValues.number,
                moduleRef: formValues.modules,
                teacherRef: formValues.teachers,
                exams: formValues.exams,
            };

            // Log the payload for demonstration (you can handle the data as needed)
            console.info('API Payload:', payload);
            updateCourseMutation.mutate(payload);
        },
        [courseId, updateCourseMutation]
    );

    // Display loading and error states

    if (isCourseError) return <div>Error when loading courses</div>;
    if (isCourseLoading) return <Spin />;

    if (courseFormFilterError) return <div>Error when loading filters</div>;
    if (isCourseFormFilterLoading) return <Spin />;

    console.info('courseData', courseData);

    const initialData: Partial<CourseFormData> = {
        description: courseData?.description,
        number: courseData?.number,
        teachers: courseData?.teachers.map((teacher) => teacher.id),
        modules: courseData?.modules.map((module) => module.id),
        exams: courseData?.exams,
    };

    console.info('initialData', initialData);

    console.info('module values:', courseFormFilterData?.modules, 'init', initialData.modules);

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
                        defaultValue={courseData?.version?.toString()}
                        options={courseData?.versions.map((version) => ({
                            value: version.toString(),
                            label: `v${version}`,
                        }))}
                    />
                </Space>
            </div>

            {courseData && (
                <Form<CourseFormData>
                    name={'courseForm'}
                    layout={'vertical'}
                    form={courseForm}
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
                            <Spin />
                        )}
                        <div className={styles.flexTwoThirds}>
                            <ExamForm
                                courseFormFilterData={courseFormFilterData}
                                initialValues={initialData}
                                courseExams={courseData.exams}
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

                <Button className={styles.buttons}>
                    <FormattedMessage
                        id={'course.ButtonActivate'}
                        defaultMessage={'Aktivieren'}
                        description={'Speichern Button'}
                    />
                </Button>

                <Button
                    type={'primary'}
                    icon={<SaveOutlined />}
                    className={styles.buttons}
                    onClick={() => {
                        courseForm.submit();
                    }}
                >
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
