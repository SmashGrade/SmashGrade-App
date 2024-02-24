import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: lazyRouteComponent(() => import('@pages/OnboardingPage.tsx')),
});
