import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
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
              }))
          );

function App() {
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
