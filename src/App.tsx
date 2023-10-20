import { OnboardingPage } from './pages/OnboardingPage';

function App() {
    console.info('API URL', import.meta.env.VITE_BACKEND_API_URL);
    return <OnboardingPage />;
}

export default App;
