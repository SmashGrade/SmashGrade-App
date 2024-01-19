import { FileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = new FileRoute('/course/new').createRoute({
    component: lazyRouteComponent(() => import('@features/course/NewCourse')),
});
