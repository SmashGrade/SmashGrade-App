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

msalInstance
    .initialize()
    .then(() => {
        // Default to using the first account if no account is active on page load
        if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
            // Account selection logic is app dependent. Adjust as needed for different use cases.
            msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
        }

        const container = document.getElementById('root')!;
        const root = ReactDOM.createRoot(container);

        root.render(
            <React.StrictMode>
                <ConfigProvider theme={antdTheme}>
                    <MsalProvider instance={msalInstance}>
                        <QueryClientProvider client={queryClient}>
                            <ReactIntlProvider>
                                <RouterProvider router={router} />
                            </ReactIntlProvider>
                            <DevSupportComponent>
                                <ReactQueryDevtools initialIsOpen={false} />
                            </DevSupportComponent>
                        </QueryClientProvider>
                    </MsalProvider>
                </ConfigProvider>
            </React.StrictMode>
        );
    })
    .catch((e) => {
        console.error(e);
    });
