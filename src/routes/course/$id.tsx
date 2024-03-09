import { getCourse, getCourseMetadata } from '@features/course-admin/course/courseApi.ts';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/course/$id')({
    parseParams: (params) => ({
        id: z.number().int().parse(parseInt(params.id)),
    }),
    async loader({ context, params }) {
        const coursePromise = context.queryClient.ensureQueryData({
            queryKey: ['courses', params.id, 1],
            queryFn: () => getCourse(params.id, 1),
        });
        const courseMetadataPromise = context.queryClient.ensureQueryData({
            queryKey: ['meta', 'course'],
            queryFn: getCourseMetadata,
        });

        const [course, metaData] = await Promise.all([coursePromise, courseMetadataPromise]);
        return { course, metaData };
    },
});
