import { studentRoute } from '@pages/routes/routes.ts';
import { lazyRouteComponent, Route } from '@tanstack/react-router';
import { z } from 'zod';

export const studentIndexRoute = new Route({
    getParentRoute: () => studentRoute,
    path: '/',
    component: lazyRouteComponent(() => import('@pages/StudentPage.tsx')),
});

export const studentCourseRoute = new Route({
    getParentRoute: () => studentRoute,
    path: 'course/$id',
    parseParams: (params) => ({ id: z.number().int().parse(parseInt(params.id)) }),
    component: lazyRouteComponent(() => import('@pages/StudentCoursePage.tsx')),
});

export const studentModuleRoute = new Route({
    getParentRoute: () => studentRoute,
    path: 'modules',
    component: lazyRouteComponent(() => import('@pages/ModulesPage.tsx')),
});
