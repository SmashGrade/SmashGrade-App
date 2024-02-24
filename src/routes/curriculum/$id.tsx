import { getCurriculum, getCurriculums } from '@features/course-admin/curriculum/curriculumApi.ts';
import { CurriculumResponseNew } from '@features/course-admin/interfaces/CurriculumData.ts';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/curriculum/$id')({
    parseParams: (params) => ({
        id: z.number().int().parse(parseInt(params.id)),
    }),
    loader: ({ context, params }) => {
        return context.queryClient.ensureQueryData<CurriculumResponseNew>({
            queryKey: ['curriculum', params.id],
            queryFn: () => getCurriculum(params.id),
        });
    },
});
