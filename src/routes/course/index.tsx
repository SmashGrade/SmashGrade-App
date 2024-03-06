import { createRoleCheckerLoader } from '@features/auth/authHelper.ts';
import { getCourses } from '@features/course-admin/course/courseApi.ts';
import { UserRoles } from '@hooks/useUserRoles.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/course/')({
    beforeLoad: createRoleCheckerLoader(UserRoles.CourseAdmin),
    loader: ({ context }) => {
        return context.queryClient.ensureQueryData({
            queryKey: ['courses'],
            queryFn: getCourses,
        });
    },
});
