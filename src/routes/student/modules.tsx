import { FileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = new FileRoute('/student/modules').createRoute({
    component: lazyRouteComponent(() => import('@pages/StudentModulePage.tsx')),
});
