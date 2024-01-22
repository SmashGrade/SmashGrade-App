import { createCourse } from '@features/course-admin/course/courseApi.ts';
import CourseForm from '@features/course-admin/course/CourseForm.tsx';
import { CourseCreationRequest } from '@features/course-admin/interfaces/CourseData.ts';
import { Route as CourseIndexRoute } from '@routes/course/index.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { message } from 'antd';
import { useIntl } from 'react-intl';

function NewCourse() {
    const newCourse: CourseCreationRequest = {
        version: 1,
        versions: [1],
        exams: [],
        modules: [],
        teachers: [],
        description: '',
        number: '',
    };

    const queryClient = useQueryClient();
    const intl = useIntl();
    const navigate = useNavigate();

    const createCourseMutation = useMutation({
        mutationFn: createCourse,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['courses'] });
            void navigate({ to: CourseIndexRoute.to });
            void message.success(
                intl.formatMessage({
                    id: 'courseForm.updateSuccessMessage',
                    description: 'Course Update success message',
                    defaultMessage: 'Kurse erfolgreich gespeichert',
                })
            );
        },
    });

    return <CourseForm courseData={newCourse} newCourse={true} mutation={createCourseMutation} />;
}

export default NewCourse;
