import NewCurriculum from '@features/course-admin/curriculum/NewCurriculum.tsx';
import { FileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = new FileRoute('/curriculum/copy/$id').createRoute({
    component: NewCurriculum,
    parseParams: (params) => ({ id: z.number().int().parse(parseInt(params.id)) }),
});
