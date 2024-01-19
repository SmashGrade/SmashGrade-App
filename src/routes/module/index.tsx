import { FileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = new FileRoute('/module/').createRoute({
    component: lazyRouteComponent(() => import('@features/course-admin/module/ModuleList')),
});
