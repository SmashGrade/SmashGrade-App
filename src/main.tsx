import { router } from '@pages/routes/routes.ts';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { antdTheme } from './config/antdTheme.ts';
import { ComponentPreviews, useInitial } from './dev';
import './global.scss';
import { ReactIntlProvider } from './i18n/ReactIntlProvider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ReactIntlProvider>
            <ConfigProvider theme={antdTheme}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </DevSupport>
                </QueryClientProvider>
            </ConfigProvider>
        </ReactIntlProvider>
    </React.StrictMode>
);
