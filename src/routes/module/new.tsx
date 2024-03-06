import { getCourses } from '@features/course-admin/course/courseApi.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/module/new')({
    loader: ({ context }) => {
        return context.queryClient.ensureQueryData({
            queryKey: ['courses'],
            queryFn: getCourses,
        });
    },
});
