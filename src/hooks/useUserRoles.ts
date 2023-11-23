import { useMsal } from '@azure/msal-react';

export default function useUserRoles() {
    const instance = useMsal();
    const activeAccount = instance.accounts[0];
    return activeAccount.idTokenClaims?.roles;
}
