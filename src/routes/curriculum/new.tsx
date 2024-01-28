import { FileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = new FileRoute('/curriculum/new').createRoute({
    component: lazyRouteComponent(() => import('@features/course-admin/curriculum/NewCurriculum')),
});
