import { createRoleCheckerLoader } from '@features/auth/authHelper.ts';
import { UserRoles } from '@hooks/useUserRoles.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/curriculum/')({
    beforeLoad: createRoleCheckerLoader(UserRoles.CourseAdmin),
});
