import NewModule from '@features/course-admin/module/NewModule.tsx';
import { FileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = new FileRoute('/module/copy/$id').createRoute({
    component: NewModule,
    parseParams: (params) => ({ id: z.number().int().parse(parseInt(params.id)) }),
});
