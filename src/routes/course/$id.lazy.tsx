import CourseEdit from '@features/course-admin/course/CourseEdit.tsx';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/course/$id')({
    component: CourseEdit,
});
