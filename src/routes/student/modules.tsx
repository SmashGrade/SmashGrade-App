import { createRoleCheckerLoader } from '@features/auth/authHelper.ts';
import { UserRoles } from '@hooks/useUserRoles.ts';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/student/modules')({
    component: lazyRouteComponent(() => import('@pages/StudentModulePage.tsx')),
    beforeLoad: createRoleCheckerLoader(UserRoles.Student),
});
