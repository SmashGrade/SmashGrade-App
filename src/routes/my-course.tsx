import { createRoleCheckerLoader } from '@features/auth/authHelper.ts';
import { UserRoles } from '@hooks/useUserRoles.ts';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/my-course')({
  component: lazyRouteComponent(() => import('@pages/MyCoursePage.tsx')),
  beforeLoad: createRoleCheckerLoader(UserRoles.Teacher),
});
