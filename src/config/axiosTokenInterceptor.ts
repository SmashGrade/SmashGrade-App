import { InteractionRequiredAuthError, IPublicClientApplication } from '@azure/msal-browser';
import { InternalAxiosRequestConfig } from 'axios';
import { msalInstance } from '../main.tsx';
import { loginRequest, msGraphBaseUrl } from './authConfig.ts';

const getIdToken = async (instance: IPublicClientApplication) => {
    try {
        const { idToken } = await instance.acquireTokenSilent({
            ...loginRequest,
        });
        return idToken;
    } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
            await instance.acquireTokenRedirect(loginRequest);
            const { idToken } = await instance.acquireTokenSilent({
                ...loginRequest,
            });
            return idToken;
        }
        console.error(error);
    }
};

export function addTokenInterceptor() {
    return async function (config: InternalAxiosRequestConfig) {
        const idToken = await getIdToken(msalInstance);
        const bearer = `Bearer ${idToken}`;
        if (config.headers && !config.url?.includes(msGraphBaseUrl)) {
            config.headers.Authorization = bearer;
        }
        return config;
    };
}
