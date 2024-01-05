import { lazyRouteComponent, Route } from '@tanstack/react-router';
import { z } from 'zod';
import { courseRoute } from './routes.ts';

export const courseIndexRoute = new Route({
    getParentRoute: () => courseRoute,
    path: '/',
    component: lazyRouteComponent(() => import('@features/course/CourseList.tsx')),
});

export const newCourseRoute = new Route({
    getParentRoute: () => courseRoute,
    path: 'new',
    component: lazyRouteComponent(() => import('@features/course/NewCourse.tsx')),
});

export const courseDetailRoute = new Route({
    getParentRoute: () => courseRoute,
    path: '$id',
    parseParams: (params) => ({ id: z.number().int().parse(parseInt(params.id)) }),
    component: lazyRouteComponent(() => import('@pages/EditCoursePage.tsx')),
});
