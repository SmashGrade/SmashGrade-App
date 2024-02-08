import { createRoleCheckerLoader } from '@features/auth/authHelper.ts';
import { UserRoles } from '@hooks/useUserRoles.ts';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/course/')({
  component: lazyRouteComponent(() => import('@features/course/CourseList')),
  beforeLoad: createRoleCheckerLoader(UserRoles.CourseAdmin),
});
