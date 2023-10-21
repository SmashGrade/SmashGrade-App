import Navigation from '@components/Navigation';
import { Outlet } from '@tanstack/react-router';

function App() {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );
}

export default App;
