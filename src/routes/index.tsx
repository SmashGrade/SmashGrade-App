import { FileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = new FileRoute('/').createRoute({
    component: lazyRouteComponent(() => import('@pages/OnboardingPage.tsx')),
});
