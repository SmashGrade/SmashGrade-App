import CourseEdit from '@features/course-admin/course/CourseEdit.tsx';
import { FileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = new FileRoute('/course/$id').createRoute({
    component: CourseEdit,
    parseParams: (params) => ({ id: z.number().int().parse(parseInt(params.id)) }),
});
