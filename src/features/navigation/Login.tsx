import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';
import { Alert } from 'antd';
import { loginRequest } from '../../config/authConfig.ts';

export function Login() {
    const { error } = useMsalAuthentication(InteractionType.Redirect, loginRequest);

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
