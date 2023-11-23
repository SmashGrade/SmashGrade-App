import { IPublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import styles from '@components/ui-elements/IconLink.module.scss';
import { MaterialIcon } from '@components/ui-elements/MaterialIcon.tsx';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import axios, { AxiosError } from 'axios';
import { loginRequest, msGraphEndpoints } from '../../config/authConfig.ts';

interface MeResponse {
    id: string;
    displayName: string;
    givenName: string;
    surname: string;
    userPrincipalName: string;
}

async function getUserPicture(instance: IPublicClientApplication) {
    const { accessToken } = await instance.acquireTokenSilent({
        ...loginRequest,
    });
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
    const { accessToken } = await instance.acquireTokenSilent({
        ...loginRequest,
    });
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
        error,
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

    if (isLoading || pictureLoading) return <Spin />;
    if (error ?? pictureError) return <div>{error?.message}</div>;

    return (
        <div className={styles.menuItemIconAbove}>
            {profilePicture ? (
                <img src={profilePicture} alt={'User Profile'} width={40} height={40} />
            ) : (
                <MaterialIcon icon={'account_circle'} size={'large'} />
            )}
            {userProfile?.displayName}
        </div>
    );
}
