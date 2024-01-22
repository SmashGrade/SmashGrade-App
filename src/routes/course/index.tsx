import { createRoleCheckerLoader } from '@features/auth/authHelper.ts';
import { UserRoles } from '@hooks/useUserRoles.ts';
import { FileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = new FileRoute('/course/').createRoute({
    component: lazyRouteComponent(() => import('@features/course/CourseList')),
    beforeLoad: createRoleCheckerLoader(UserRoles.CourseAdmin),
});
