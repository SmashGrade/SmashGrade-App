import ModuleDetail from '@features/course-admin/module/ModuleDetail.tsx';
import { FileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = new FileRoute('/module/$id').createRoute({
    component: ModuleDetail,
    parseParams: (params) => ({ id: z.number().int().parse(parseInt(params.id)) }),
});
