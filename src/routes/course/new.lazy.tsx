import NewCourse from '@features/course-admin/NewCourse.tsx';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/course/new')({
    component: NewCourse,
});
