import StudentCoursePage from '@pages/StudentCoursePage.tsx';
import { FileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = new FileRoute('/student/course/$id').createRoute({
    component: StudentCoursePage,
    parseParams: (params) => ({ id: z.number().int().parse(parseInt(params.id)) }),
});
