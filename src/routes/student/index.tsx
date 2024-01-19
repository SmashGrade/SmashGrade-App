import { FileRoute, Outlet } from '@tanstack/react-router';

export const Route = new FileRoute('/student/').createRoute({
    component: () => <Outlet />,
});
