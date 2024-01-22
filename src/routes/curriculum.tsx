import { createRoleCheckerLoader } from '@features/auth/authHelper.ts';
import { UserRoles } from '@hooks/useUserRoles.ts';
import { FileRoute } from '@tanstack/react-router';

export const Route = new FileRoute('/curriculum').createRoute({
    component: () => <div>PlaceholderCurriculumPage</div>,
    beforeLoad: createRoleCheckerLoader(UserRoles.CourseAdmin),
});
