import { createRoleCheckerLoader } from '@features/auth/authHelper.ts';
import { UserRoles } from '@hooks/useUserRoles.ts';
import { FileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = new FileRoute('/my-course').createRoute({
    component: lazyRouteComponent(() => import('@pages/MyCoursePage.tsx')),
    beforeLoad: createRoleCheckerLoader(UserRoles.Teacher),
});
