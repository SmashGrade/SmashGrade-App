import NewCurriculum from '@features/course-admin/curriculum/NewCurriculum.tsx';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/curriculum/new')({
    component: NewCurriculum,
});
