/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Configuration, LogLevel } from '@azure/msal-browser';

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

export const msalConfig: Configuration = {
    auth: {
        clientId: '72acf4df-78f6-4e6f-81c6-f5aa1efa8ebc',
        authority: 'https://login.microsoftonline.com/744b66c4-2df7-4756-905a-c1127799c955',
        redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URL,
    },
    cache: {
        cacheLocation: 'sessionStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ['User.Read'],
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */

const msGraphBaseUrl = 'https://graph.microsoft.com/v1.0';
export const msGraphEndpoints = {
    userProfile: `${msGraphBaseUrl}/me`,
    userProfilePicture: `${msGraphBaseUrl}/me/photo/$value`,
};