import { getCourse, updateCourse } from '@features/course-admin/course/courseApi.ts';
import CourseForm from '@features/course-admin/course/CourseForm.tsx';
import { CourseResponse } from '@features/course-admin/interfaces/CourseData.ts';
import { courseDetailRoute } from '@pages/routes/courseRoutes.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { message, Spin } from 'antd';
import { useIntl } from 'react-intl';

export function CourseEdit() {
    const { id } = useParams({ from: courseDetailRoute.id });
    const courseId = id ?? 1;

    const queryClient = useQueryClient();
    const intl = useIntl();

    const {
        isPending: isCourseLoading,
        error: isCourseError,
        data: courseData,
    } = useQuery<CourseResponse>({
        queryKey: ['courses', courseId],
        queryFn: () => getCourse(courseId),
    });

    const updateCourseMutation = useMutation({
        mutationFn: updateCourse,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['courses', courseData?.id] });
            void queryClient.invalidateQueries({ queryKey: ['courses'] });
            void message.success(
                intl.formatMessage({
                    id: 'courseForm.updateSuccessMessage',
                    description: 'Course Update success message',
                    defaultMessage: 'Kurse erfolgreich gespeichert',
                })
            );
        },
    });

    // Display loading and error states
    if (isCourseError) return <div>Error when loading courses</div>;
    if (isCourseLoading) return <Spin />;

    return <>{courseData && <CourseForm courseData={courseData} mutation={updateCourseMutation} />}</>;
}
