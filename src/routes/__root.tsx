import { PublicClientApplication } from '@azure/msal-browser';
import { rootRouteWithContext } from '@tanstack/react-router';
import App from '../App.tsx';

export interface MyRouterContext {
    auth: PublicClientApplication;
}

export const Route = rootRouteWithContext<MyRouterContext>()({
    component: App,
});
