import { InteractionRequiredAuthError, IPublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import styles from '@components/ui-elements/IconLink.module.scss';
import { Spinner } from '@components/ui-elements/Spinner.tsx';
import { useUserProfile } from '@hooks/useUserProfile.ts';
import { useQuery } from '@tanstack/react-query';
import { Avatar } from 'antd';
import axios, { AxiosError } from 'axios';
import { loginRequest, msGraphEndpoints } from '../../config/authConfig.ts';

const getAccessToken = async (instance: IPublicClientApplication) => {
    try {
        const response = await instance.acquireTokenSilent({
            ...loginRequest,
        });
        const accessToken = response.accessToken;
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

export function UserProfile() {
    const { instance } = useMsal();
    const { userProfile, isLoading, error } = useUserProfile();

    const { error: pictureError, data: profilePicture } = useQuery({
        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: ['userPicture'],
        queryFn: () => getUserPicture(instance),
    });

    if (isLoading) return <Spinner />;
    if (error) return <div>Fehler beim Laden des Benutzerprofils: {error.message}</div>;
    if (pictureError) return <div>Fehler beim Laden des Profilbildes: {pictureError.message}</div>;

    const nameParts = userProfile?.displayName.split(' ');
    const initials = nameParts ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}` : '';

    return (
        <div className={styles.menuItemIconAbove}>
            <Avatar src={profilePicture} shape={'circle'} size={40} alt={'User Profile'}>
                {/*Initials are a fallback for profile picture (for example if no picture is found)*/}
                {!profilePicture && initials}
            </Avatar>
            {userProfile?.displayName}
        </div>
    );
}
