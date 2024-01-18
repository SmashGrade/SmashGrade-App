import EditCoursePage from '@pages/EditCoursePage.tsx';
import { FileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = new FileRoute('/course/$id').createRoute({
    component: EditCoursePage,
    parseParams: (params) => ({ id: z.number().int().parse(parseInt(params.id)) }),
});
