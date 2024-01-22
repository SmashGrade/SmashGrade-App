import { createRoleCheckerLoader } from '@features/auth/authHelper.ts';
import { UserRoles } from '@hooks/useUserRoles.ts';
import { FileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = new FileRoute('/student/modules').createRoute({
    component: lazyRouteComponent(() => import('@pages/StudentModulePage.tsx')),
    beforeLoad: createRoleCheckerLoader(UserRoles.Student),
});
