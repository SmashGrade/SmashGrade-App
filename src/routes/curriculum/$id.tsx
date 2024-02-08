import CurriculumDetail from '@features/course-admin/curriculum/CurriculumDetail.tsx';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/curriculum/$id')({
  component: CurriculumDetail,
  parseParams: (params) => ({
    id: z.number().int().parse(parseInt(params.id)),
  }),
});
