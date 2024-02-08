import CourseEdit from '@features/course-admin/course/CourseEdit.tsx';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/course/$id')({
  component: CourseEdit,
  parseParams: (params) => ({
    id: z.number().int().parse(parseInt(params.id)),
  }),
});
