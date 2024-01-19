import { FileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = new FileRoute('/onboarding').createRoute({
    component: lazyRouteComponent(() => import('@pages/OnboardingPage')),
});
