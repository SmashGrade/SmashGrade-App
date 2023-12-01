import { EventType, PublicClientApplication } from '@azure/msal-browser';
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
import { LocaleProvider } from './i18n/ReactIntlProvider.tsx';

const queryClient = new QueryClient();
const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload && 'account' in event.payload) {
        msalInstance.setActiveAccount(event.payload.account ?? null);
    }
});

msalInstance
    .initialize()
    .then(() => {
        const container = document.getElementById('root')!;
        const root = ReactDOM.createRoot(container);

        root.render(
            <React.StrictMode>
                <LocaleProvider>
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
                </LocaleProvider>
            </React.StrictMode>
        );
    })
    .catch((e) => {
        console.error(e);
    });
