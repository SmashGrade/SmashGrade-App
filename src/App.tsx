import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Login } from '@features/navigation/Login.tsx';
import Navigation from '@features/navigation/Navigation.tsx';
import { Outlet } from '@tanstack/react-router';
import React, { useEffect } from 'react';

const TanStackRouterDevtoolsAsync =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : React.lazy(() =>
              // Lazy load in development
              import('@tanstack/router-devtools').then((res) => ({
                  default: res.TanStackRouterDevtools,
              }))
          );

function App() {
    const { accounts, instance } = useMsal();

    useEffect(() => {
        if (!instance.getActiveAccount() && accounts.length === 1) {
            if (accounts[0].tenantId != import.meta.env.VITE_AUTH_AUTHORITY_ID) {
                console.error('The tenant ID of the account does not match the tenant ID of the application.');
                throw new Error('The tenant ID of the account does not match the tenant ID of the application.');
            }
            instance.setActiveAccount(accounts[0]);
        }
    }, [accounts, instance]);

    return (
        <>
            <AuthenticatedTemplate>
                <>
                    <Navigation />
                    <Outlet />
                    <React.Suspense fallback={null}>
                        <TanStackRouterDevtoolsAsync position={'bottom-left'} />
                    </React.Suspense>
                </>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Login />
            </UnauthenticatedTemplate>
        </>
    );
}

export default App;
