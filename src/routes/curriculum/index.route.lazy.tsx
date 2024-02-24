import CurriculumList from '@features/course-admin/curriculum/CurriculumList.tsx';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/curriculum/')({
    component: CurriculumList,
});
