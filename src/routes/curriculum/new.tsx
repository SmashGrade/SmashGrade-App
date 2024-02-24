import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/curriculum/new')({
    component: lazyRouteComponent(() => import('@features/course-admin/curriculum/NewCurriculum')),
});
