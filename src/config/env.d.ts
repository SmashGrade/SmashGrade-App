/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_API_URL: string;
    readonly VITE_AUTH_REDIRECT_URL: string;
    readonly VITE_AUTH_CLIENT_ID: string;
    readonly VITE_AUTH_AUTHORITY_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
