import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { msGraphEndpoints, loginRequest } from '../config/authConfig.ts';
import { InteractionRequiredAuthError, IPublicClientApplication } from '@azure/msal-browser';

interface MeResponse {
    id: string;
    displayName: string;
    givenName: string;
    surname: string;
    userPrincipalName: string;
}

const getAccessToken = async (instance: IPublicClientApplication) => {
    try {
        const { accessToken } = await instance.acquireTokenSilent({
            ...loginRequest,
        });
        return accessToken;
    } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
            await instance.acquireTokenRedirect(loginRequest);
            const { accessToken } = await instance.acquireTokenSilent({
                ...loginRequest,
            });
            return accessToken;
        }
        console.error(error);
    }
};

async function fetchUserProfile(instance: IPublicClientApplication) {
    const accessToken = await getAccessToken(instance);
    const { data } = await axios.get<MeResponse>(msGraphEndpoints.userProfile, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
}

export function useUserProfile() {
    const { instance } = useMsal();

    const {
        data: userProfile,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['userProfile'],
        queryFn: () => fetchUserProfile(instance),
    });

    return { userProfile, isLoading, error };
}
