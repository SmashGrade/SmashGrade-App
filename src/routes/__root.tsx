import { PublicClientApplication } from '@azure/msal-browser';
import { rootRouteWithContext } from '@tanstack/react-router';
import App from '../App.tsx';

export interface MyRouterContext {
    auth: PublicClientApplication;
    authInProgress: boolean;
}

export const Route = rootRouteWithContext<MyRouterContext>()({
    component: App,
    // beforeLoad: async ({ context }) => {
    //     context.auth;
    //     // if (!context?.auth?.getAllAccounts().length) {
    //     //     console.error('No accounts found');
    //     //     throw new NoSignedInAccount('No signed in account');
    //     // }
    // },
});
