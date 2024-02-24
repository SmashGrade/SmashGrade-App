import { createRoleCheckerLoader } from '@features/auth/authHelper.ts';
import { UserRoles } from '@hooks/useUserRoles.ts';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/onboarding')({
    component: lazyRouteComponent(() => import('@pages/OnboardingPage')),
    beforeLoad: createRoleCheckerLoader(UserRoles.Student),
});
