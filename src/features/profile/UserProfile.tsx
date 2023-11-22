import { AccountInfo, IPublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import styles from '@components/IconLink.module.scss';
import { MaterialIcon } from '@components/MaterialIcon.tsx';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Spin } from 'antd';
import axios from 'axios';
import { graphConfig, loginRequest } from '../../config/authConfig.ts';

interface MeResponse {
    id: string;
    displayName: string;
    givenName: string;
    surname: string;
    userPrincipalName: string;
    // Add other properties as needed
}

export async function getUserProfile(instance: IPublicClientApplication, account: AccountInfo) {
    const { accessToken } = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
    });

    const profileData = await axios.get<MeResponse>(graphConfig.graphMeEndpoint, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const profilePhoto = await axios.get(graphConfig.graphPhotoEndpoint, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log(profilePhoto.data);

    return profileData.data;
}
export function UserProfile() {
    const { instance, accounts } = useMsal();
    const {
        isLoading,
        error,
        data: userProfile,
    } = useQuery({
        queryKey: ['userProfile'],
        queryFn: () => getUserProfile(instance, accounts[0]),
    });
    if (isLoading) return <Spin />;
    if (error) return <div>{error.message}</div>;

    return (
        <Link>
            <div className={styles.menuItemIconAbove}>
                <MaterialIcon icon={'account_circle'} size={'large'} />
                {userProfile?.displayName}
            </div>
        </Link>
    );
}
