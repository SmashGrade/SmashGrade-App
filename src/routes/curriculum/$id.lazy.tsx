import { CurriculumEdit } from '@features/course-admin/curriculum/EditCurriculum';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/curriculum/$id')({
    component: CurriculumEdit,
});
