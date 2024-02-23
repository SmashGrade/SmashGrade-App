import { PublicClientApplication } from '@azure/msal-browser';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';
import App from '../App.tsx';

export interface MyRouterContext {
  auth: PublicClientApplication;
  authInProgress: boolean;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: App,
});
