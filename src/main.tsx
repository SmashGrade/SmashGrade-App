import { EventType, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { onApiError } from '@components/error/apiError.ts';
import { DefaultErrorComponent } from '@components/error/DefaultErrorComponent.tsx';
import { Spinner } from '@components/ui-elements/Spinner.tsx';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { antdTheme } from './config/antdTheme.ts';
import { msalConfig } from './config/authConfig.ts';
import DevSupportComponent from './dev/DevSupportComponent.tsx';
import './global.scss';
import { LocaleProvider } from './i18n/ReactIntlProvider.tsx';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: onApiError,
  }),
});
export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event) => {
  if (
    event.eventType === EventType.LOGIN_SUCCESS &&
    event.payload &&
    'account' in event.payload
  ) {
    msalInstance.setActiveAccount(event.payload.account ?? null);
  }
});

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: msalInstance,
    authInProgress: true,
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 5,
  defaultErrorComponent: DefaultErrorComponent,
  defaultPendingComponent: Spinner,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

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
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
                <DevSupportComponent />
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
