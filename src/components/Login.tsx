import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { loginRequest } from '../config/authConfig.ts';

export function Login() {
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();

    useEffect(() => {
        if (!isAuthenticated) {
            instance
                .loginRedirect(loginRequest)
                .then(() => {
                    console.log('successfully logged in');
                })
                .catch((e) => {
                    console.log(`Error Logging in: ${e}`);
                });
        }
    }, [instance, isAuthenticated]);

    return <></>;
}
