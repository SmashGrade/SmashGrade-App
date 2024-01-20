import { InteractionRequiredAuthError, InteractionStatus, InteractionType } from '@azure/msal-browser';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { Route } from '@routes/__root.tsx';
import { useRouter } from '@tanstack/react-router';
import { Alert } from 'antd';
import { useEffect } from 'react';
import { loginRequest } from '../../config/authConfig.ts';
import styles from './Login.module.scss';

export function Login() {
    const { instance, accounts, inProgress } = useMsal();
    const activeAccount = accounts[0];
    const { login, error } = useMsalAuthentication(InteractionType.Silent, {
        ...loginRequest,
        loginHint: activeAccount?.idTokenClaims?.login_hint,
    });

    const router = useRouter();

    useEffect(() => {
        const rootRoute = router.state.matches.find((match) => match?.routeId === Route.id);
        if (rootRoute) {
            rootRoute.context.authInProgress = inProgress !== InteractionStatus.None;
        }
    }, [inProgress, router.state.matches]);

    useEffect(() => {
        if (error instanceof InteractionRequiredAuthError) {
            login(InteractionType.Redirect, loginRequest)
                .then((response) => {
                    if (!instance.getActiveAccount() && response?.account) {
                        instance.setActiveAccount(response.account);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [error, instance, login]);

    if (error && !(error instanceof InteractionRequiredAuthError)) {
        return (
            <div className={styles.loginContainer}>
                <Alert
                    message={'Login Error'}
                    description={`There was an error logging in: ${error.errorMessage}
                    Please refresh the page and try again.`}
                    type={'error'}
                    closable
                />
            </div>
        );
    }

    return null;
}
