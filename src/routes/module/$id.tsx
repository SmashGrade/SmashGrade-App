import { getCourses } from '@features/course-admin/course/courseApi.ts';
import { getModule } from '@features/course-admin/module/moduleApi.ts';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/module/$id')({
    parseParams: (params) => ({
        id: z.number().int().parse(parseInt(params.id)),
    }),
    loader: async ({ context, params }) => {
        const modulePromise = context.queryClient.ensureQueryData({
            queryKey: ['module', params.id],
            queryFn: () => getModule(params.id),
        });
        const coursesPromise = context.queryClient.ensureQueryData({
            queryKey: ['courses'],
            queryFn: getCourses,
        });
        const [module, courses] = await Promise.all([modulePromise, coursesPromise]);
        return { module, courses };
    },
});
