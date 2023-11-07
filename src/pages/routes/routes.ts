import { lazyRouteComponent, RootRoute, Route, Router } from '@tanstack/react-router';
import App from '../../App.tsx';
import OnboardingPage from '../OnboardingPage.tsx';

const rootRoute: RootRoute = new RootRoute({
    component: App,
});

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: OnboardingPage,
});

const onboardingRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/onboarding',
    component: OnboardingPage,
});

const curriculumRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/curriculum',
    component: lazyRouteComponent(() => import('@pages/PlaceholderCurriculumPage.tsx')),
});

export const courseRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/course',
    component: lazyRouteComponent(() => import('@pages/CoursePage.tsx')),
});

const routeTree = rootRoute.addChildren([indexRoute, onboardingRoute, curriculumRoute, courseRoute]);
export const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
