import { InteractionType } from '@azure/msal-browser';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { Alert } from 'antd';
import { useEffect } from 'react';

export function Login() {
    const { instance } = useMsal();
    const { result, error } = useMsalAuthentication(InteractionType.Redirect);

    useEffect(() => {
        if (result !== null && !instance.getActiveAccount() && instance.getAllAccounts().length > 0) {
            instance.setActiveAccount(instance.getAllAccounts()[0]);
        }
    }, [instance, result]);

    if (error) {
        return (
            <Alert
                message={'Login Error'}
                description={`There was an error logging in: ${error.errorMessage} 
                Please refresh the page and try again.`}
                type={'error'}
                closable
            />
        );
    }

    return null;
}
