import { AccountInfo, PublicClientApplication } from '@azure/msal-browser';
import { UserRoles } from '@hooks/useUserRoles.ts';
import { NoSignedInAccount } from '../../exceptions/NoSignedInAccount.ts';
import { PermissionDeniedError } from '../../exceptions/PermissionDeniedError.ts';

export const getActiveAccount = (authClient: PublicClientApplication) => {
    const activeAccount = authClient.getActiveAccount();
    if (!activeAccount) {
        throw new NoSignedInAccount(
            'No active account! Verify a user has been signed in and setActiveAccount has been called.'
        );
    }
    return activeAccount;
};

export const getRoles = (account: AccountInfo) => {
    return account.idTokenClaims?.roles as UserRoles[] | undefined;
};

export const hasRole = (account: AccountInfo, role: UserRoles) => {
    const roles = getRoles(account);
    return roles?.includes(role);
};

export const currentUserHasRole = (authClient: PublicClientApplication, role: UserRoles) => {
    const activeAccount = getActiveAccount(authClient);
    return hasRole(activeAccount, role);
};

export const hasRoleToAccessRouteOrThrow = (
    authClient: PublicClientApplication,
    role: UserRoles,
    authInProgress: boolean
) => {
    if (authInProgress) {
        void new Promise((resolve) => {
            setTimeout(() => {
                resolve(null);
            }, 2000);
        });
    }
    if (!currentUserHasRole(authClient, role)) {
        throw new PermissionDeniedError('You do not have permission to view this page.');
    }
};

export const createRoleCheckerLoader = (role: UserRoles) => {
    return ({
        context: { auth, authInProgress },
    }: {
        context: { auth: PublicClientApplication; authInProgress: boolean };
    }) => hasRoleToAccessRouteOrThrow(auth, role, authInProgress);
};
