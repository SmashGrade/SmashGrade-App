import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { router } from '@pages/routes/routes.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { antdTheme } from './config/antdTheme.ts';
import { msalConfig } from './config/authConfig.ts';
import DevSupportComponent from './dev/DevSupportComponent.tsx';
import './global.scss';
import { ReactIntlProvider } from './i18n/ReactIntlProvider.tsx';

const queryClient = new QueryClient();
const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <ReactIntlProvider>
                <ConfigProvider theme={antdTheme}>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                        <DevSupportComponent>
                            <ReactQueryDevtools initialIsOpen={false} />
                        </DevSupportComponent>
                    </QueryClientProvider>
                </ConfigProvider>
            </ReactIntlProvider>
        </MsalProvider>
    </React.StrictMode>
);
