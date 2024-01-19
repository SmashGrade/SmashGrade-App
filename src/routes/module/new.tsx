import { FileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = new FileRoute('/module/new').createRoute({
    component: lazyRouteComponent(() => import('@features/course-admin/module/NewModule')),
});
