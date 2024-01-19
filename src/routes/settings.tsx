import { FileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = new FileRoute('/settings').createRoute({
    component: lazyRouteComponent(() => import('@features/settings/Settings')),
});
