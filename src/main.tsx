import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import { msalConfig } from './components/authConfig';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                components: {
                    Collapse: {
                        headerBg: '#95223F',
                        colorTextHeading: '#FFFFFF',
                    },
                    Table: {
                        headerBg: '#95223F',
                        colorTextHeading: '#FFFFFF',
                    },
                },
                token: {
                    colorPrimary: '#95223F',
                    borderRadius: 2,
                    colorBgContainer: '#FFFFFF',
                    borderRadiusLG: 8,
                    fontFamily: 'Roboto',
                    colorLink: '#C6264E',
                    colorLinkHover: '#3D3D3C',
                    colorLinkActive: '#5F1530',
                },
            }}
        >
            <MsalProvider instance={msalInstance}>
                <App />
            </MsalProvider>
        </ConfigProvider>
    </React.StrictMode>
);
