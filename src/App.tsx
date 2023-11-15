import Navigation from '@components/Navigation';
import { Outlet } from '@tanstack/react-router';
import React from 'react';

const TanStackRouterDevtools =
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
            <Navigation />
            <Outlet />

            <TanStackRouterDevtools position={'bottom-left'} />
        </>
    );
}

export default App;
