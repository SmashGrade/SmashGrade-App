import { PublicClientApplication } from '@azure/msal-browser';
import { createRootRouteWithContext } from '@tanstack/react-router';
import App from '../App.tsx';

export interface MyRouterContext {
  auth: PublicClientApplication;
  authInProgress: boolean;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: App,
});
