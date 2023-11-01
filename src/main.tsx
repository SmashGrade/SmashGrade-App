import StudentModulePage from './pages/ModulesPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import colors from './colors.module.scss';
import './global.scss';
import { ReactIntlProvider } from './i18n/ReactIntlProvider.tsx';
import { RootRoute, Route, Router, RouterProvider } from '@tanstack/react-router';
import { OnboardingPage } from './pages/OnboardingPage';

const queryClient = new QueryClient();

const rootRoute: RootRoute = new RootRoute({
    component: App,
});

const indexRoute = new Route({ getParentRoute: () => rootRoute, path: '/', component: OnboardingPage });
const studentModuleRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/modules/',
    component: StudentModulePage,
});
const routeTree = rootRoute.addChildren([indexRoute, studentModuleRoute]);
const router = new Router({ routeTree });

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ReactIntlProvider>
            <ConfigProvider
                theme={{
                    components: {
                        Collapse: {
                            headerBg: colors.colorSecondary,
                            colorBgContainer: colors.colorTertiary,
                            colorTextHeading: colors.colorTextHeading,
                            fontWeightStrong: 1000,
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
