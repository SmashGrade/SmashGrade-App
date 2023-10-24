import { Outlet } from '@tanstack/react-router';
import Navigation from '@components/Navigation';

function App() {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );
}

export default App;
