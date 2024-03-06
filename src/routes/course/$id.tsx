import { getCourse } from '@features/course-admin/course/courseApi.ts';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/course/$id')({
    parseParams: (params) => ({
        id: z.number().int().parse(parseInt(params.id)),
    }),
    loader({ context, params }) {
        return context.queryClient.ensureQueryData({
            queryKey: ['courses', params.id, 1],
            queryFn: () => getCourse(params.id, 1),
        });
    },
});
