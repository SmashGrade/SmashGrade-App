import { InteractionRequiredAuthError, InteractionType } from '@azure/msal-browser';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { Alert } from 'antd';
import { useEffect } from 'react';
import { loginRequest } from '../../config/authConfig.ts';
import styles from './Login.module.scss';

export function Login() {
    const { instance, accounts } = useMsal();
    const activeAccount = accounts[0];
    const { login, error } = useMsalAuthentication(InteractionType.Silent, {
        ...loginRequest,
        loginHint: activeAccount?.idTokenClaims?.login_hint,
    });

    useEffect(() => {
        if (error instanceof InteractionRequiredAuthError) {
            login(InteractionType.Popup, loginRequest)
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

    return (
        <div className={styles.loginContainer}>
            <Alert
                message={'Login in Progress'}
                description={`You need to complete the Login PopUp before you can access the Site`}
                type={'info'}
                closable
            />
        </div>
    );
}
