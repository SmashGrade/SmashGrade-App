import { router } from '@pages/routes/routes.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { antdTheme } from './config/antdTheme.ts';
import DevSupportComponent from './dev/DevSupportComponent.tsx';
import './global.scss';
import { LocaleProvider } from './i18n/ReactIntlProvider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <LocaleProvider>
            <ConfigProvider theme={antdTheme}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <DevSupportComponent>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </DevSupportComponent>
                </QueryClientProvider>
            </ConfigProvider>
        </LocaleProvider>
    </React.StrictMode>
);
