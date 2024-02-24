import { createRoleCheckerLoader } from '@features/auth/authHelper.ts';
import { UserRoles } from '@hooks/useUserRoles.ts';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/curriculum/')({
    component: lazyRouteComponent(() => import('@features/course-admin/curriculum/CurriculumList')),
    beforeLoad: createRoleCheckerLoader(UserRoles.CourseAdmin),
});
