import CurriculumDetail from '@features/course-admin/curriculum/CurriculumDetail.tsx';
import { FileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = new FileRoute('/curriculum/$id').createRoute({
    component: CurriculumDetail,
    parseParams: (params) => ({ id: z.number().int().parse(parseInt(params.id)) }),
});
