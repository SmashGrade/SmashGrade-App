import { getCourse, updateCourse } from '@features/course-admin/course/courseApi.ts';
import CourseForm from '@features/course-admin/course/CourseForm.tsx';
import { Route } from '@routes/course/$id.tsx';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { message } from 'antd';
import { useIntl } from 'react-intl';

export default function CourseEdit() {
    const params = Route.useParams();
    const course = useSuspenseQuery({
        queryKey: ['courses', params.id, 1],
        queryFn: () => getCourse(params.id, 1),
    }).data;

    const queryClient = useQueryClient();
    const intl = useIntl();

    const updateCourseMutation = useMutation({
        mutationFn: updateCourse,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ['courses', course?.id],
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

    return <>{course && <CourseForm courseData={course} mutation={updateCourseMutation} />}</>;
}
