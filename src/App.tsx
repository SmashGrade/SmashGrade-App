import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Login } from '@features/navigation/Login.tsx';
import Navigation from '@features/navigation/Navigation.tsx';
import { Outlet } from '@tanstack/react-router';
import React from 'react';

const TanStackRouterDevtoolsAsync =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : React.lazy(() =>
              // Lazy load in development
              import('@tanstack/router-devtools').then((res) => ({
                  default: res.TanStackRouterDevtools,
                  // For Embedded Mode
                  // default: res.TanStackRouterDevtoolsPanel
              }))
          );

function App() {
    const { instance: msalInstance } = useMsal();
    // Default to using the first account if no account is active on page load
    if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
        // Account selection logic is app dependent. Adjust as needed for different use cases.
        msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
    }

    return (
        <>
            <AuthenticatedTemplate>
                <Navigation />
                <Outlet />
                <TanStackRouterDevtoolsAsync position={'bottom-left'} />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Login />
            </UnauthenticatedTemplate>
        </>
    );
}

export default App;
