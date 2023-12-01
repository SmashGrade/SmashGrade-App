import { InteractionRequiredAuthError, IPublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import styles from '@components/ui-elements/IconLink.module.scss';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Spin } from 'antd';
import axios, { AxiosError } from 'axios';
import { loginRequest, msGraphEndpoints } from '../../config/authConfig.ts';

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
    }
};

async function getUserPicture(instance: IPublicClientApplication) {
    const accessToken = await getAccessToken(instance);
    try {
        const profilePhoto = await axios.get<Blob>(msGraphEndpoints.userProfilePicture, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            responseType: 'blob',
        });
        // Convert blob data to a data URL
        const imageUrl: string = URL.createObjectURL(profilePhoto.data);
        return imageUrl;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error;
            if (axiosError.response?.status === 404) {
                return null;
            }
        }
        throw error;
    }
}

async function getUserProfile(instance: IPublicClientApplication) {
    const accessToken = await getAccessToken(instance);
    const { data } = await axios.get<MeResponse>(msGraphEndpoints.userProfile, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data;
}

export function UserProfile() {
    const { instance } = useMsal();
    const {
        isLoading,
        error: userProfileError,
        data: userProfile,
    } = useQuery({
        queryKey: ['userProfile'],
        queryFn: () => getUserProfile(instance),
    });
    const {
        isLoading: pictureLoading,
        error: pictureError,
        data: profilePicture,
    } = useQuery({
        queryKey: ['userPicture'],
        queryFn: () => getUserPicture(instance),
    });

    if (isLoading || pictureLoading || userProfile === undefined) return <Spin />;
    if (pictureError) return <div>{pictureError.message}</div>;
    if (userProfileError) return <div>{userProfileError.message}</div>;

    const nameParts = userProfile.displayName.split(' ');
    const initials = `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`;

    return (
        <div className={styles.menuItemIconAbove}>
            <Avatar src={profilePicture} shape={'circle'} size={40} alt={'User Profile'}>
                {/*Initials are a fallback for profile picture (for example if no picture is found)*/}
                {initials}
            </Avatar>
            {userProfile?.displayName}
        </div>
    );
}
