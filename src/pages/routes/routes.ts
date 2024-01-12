import StudentModulePage from '@pages/ModulesPage.tsx';
import { courseDetailRoute, courseIndexRoute, newCourseRoute } from '@pages/routes/courseRoutes.ts';
import { lazyRouteComponent, RootRoute, Route, Router, RouterMeta } from '@tanstack/react-router';
import App from '../../App.tsx';
import OnboardingPage from '../OnboardingPage.tsx';

const routerMeta = new RouterMeta();

export const onboardingRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/onboarding',
    component: OnboardingPage,
});

const rootRoute: RootRoute = routerMeta.createRootRoute({
    component: App,
});

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: OnboardingPage,
});

export const curriculumRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/curriculum',
    component: lazyRouteComponent(() => import('@pages/PlaceholderCurriculumPage.tsx')),
});

export const courseRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'course',
    component: lazyRouteComponent(() => import('@pages/CoursePage.tsx')),
});

export const settingsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'settings',
    component: lazyRouteComponent(() => import('@pages/SettingsPage.tsx')),
});

export const studentModuleRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'modules',
    component: StudentModulePage,
});

export const myCourseRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'my-course',
    component: lazyRouteComponent(() => import('@pages/MyCoursePage.tsx')),
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    onboardingRoute,
    curriculumRoute,
    studentModuleRoute,
    settingsRoute,
    courseRoute.addChildren([courseIndexRoute.addChildren([courseDetailRoute, newCourseRoute])]),
    myCourseRoute,
]);
export const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
