import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Login } from '@components/Login';
import Navigation from '@components/Navigation';
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
