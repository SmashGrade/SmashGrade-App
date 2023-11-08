import Navigation from '@components/Navigation';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

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
