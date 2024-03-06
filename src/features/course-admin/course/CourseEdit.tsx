import { updateCourse } from '@features/course-admin/course/courseApi.ts';
import CourseForm from '@features/course-admin/course/CourseForm.tsx';
import { Route } from '@routes/course/$id.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export default function CourseEdit() {
    const courseData = Route.useLoaderData();

    const queryClient = useQueryClient();
    const intl = useIntl();

    // const {
    //     isPending: isCourseLoading,
    //     error: isCourseError,
    //     data: courseData,
    // } = useQuery<CourseResponse>({
    //     queryKey: ['courses', courseId, 1],
    //     queryFn: () => getCourse(courseId, 1),
    // });

    const updateCourseMutation = useMutation({
        mutationFn: updateCourse,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ['courses', courseData?.id],
            });
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

    return <>{courseData && <CourseForm courseData={courseData} mutation={updateCourseMutation} />}</>;
}
