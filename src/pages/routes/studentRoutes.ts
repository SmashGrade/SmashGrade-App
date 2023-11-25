import { studentRoute } from '@pages/routes/routes.ts';
import { lazyRouteComponent, Route } from '@tanstack/react-router';
import { z } from 'zod';

export const studentIndexRoute = new Route({
    getParentRoute: () => studentRoute,
    path: '$id',
    parseParams: (params) => ({ id: z.number().int().parse(parseInt(params.id)) }),
    component: lazyRouteComponent(() => import('@pages/StudentCourseDetailPage.tsx')),
});
