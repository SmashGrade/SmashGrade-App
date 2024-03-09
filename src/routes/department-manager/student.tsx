import { createRoleCheckerLoader } from '@features/auth/authHelper.ts';
import { UserRoles } from '@hooks/useUserRoles.ts';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/department-manager/student')({
    component: lazyRouteComponent(() => import('@features/department-manager/student/StudentOverview')),
    beforeLoad: createRoleCheckerLoader(UserRoles.DepartmentManager),
});
