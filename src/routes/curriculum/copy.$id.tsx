import NewCurriculum from '@features/course-admin/curriculum/NewCurriculum.tsx';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/curriculum/copy/$id')({
  component: NewCurriculum,
  parseParams: (params) => ({
    id: z.number().int().parse(parseInt(params.id)),
  }),
});
