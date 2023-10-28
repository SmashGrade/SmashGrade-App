import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazyRouteComponent, RootRoute, Route, Router, RouterProvider } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import colors from './colors.module.scss';
import './global.scss';
import { ReactIntlProvider } from './i18n/ReactIntlProvider.tsx';
import OnboardingPage from './pages/OnboardingPage';

const queryClient = new QueryClient();

const rootRoute: RootRoute = new RootRoute({
    component: App,
});

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: OnboardingPage,
});

const onboardingRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/onboarding',
    component: OnboardingPage,
});

const curriculumRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/curriculum',
    component: lazyRouteComponent(() => import('./pages/PlaceholderCurriculumPage.tsx')),
});

export const courseRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/course',
    component: lazyRouteComponent(() => import('./pages/CoursePage.tsx')),
});

const routeTree = rootRoute.addChildren([indexRoute, onboardingRoute, curriculumRoute, courseRoute]);
const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ReactIntlProvider>
            <ConfigProvider
                theme={{
                    components: {
                        Collapse: {
                            headerBg: colors.colorPrimary,
                            colorTextHeading: colors.colorTextHeading,
                        },
                        Table: {
                            headerBg: colors.colorPrimary,
                            colorTextHeading: colors.colorTextHeading,
                        },
                    },
                    token: {
                        colorPrimary: colors.colorPrimary,
                        borderRadius: 12,
                        colorBgContainer: colors.colorBgContainer,
                        fontFamily: 'Roboto',
                        colorLink: colors.colorLink,
                        colorLinkHover: colors.colorLinkHover,
                        colorLinkActive: colors.colorLinkActive,
                    },
                }}
            >
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ConfigProvider>
        </ReactIntlProvider>
    </React.StrictMode>
);
