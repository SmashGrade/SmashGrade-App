import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import colors from './colors.module.scss';
import './global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                components: {
                    Collapse: {
                        headerBg: colors.colorPrimary,
                        colorTextHeading: colors.colorTextHeading,
                    },
                    Table: {
                        headerBg: colors.colorPrimary,
                        colorTextHeading: colors.colorTextHeading,
                    },
                },
                token: {
                    colorPrimary: colors.colorPrimary,
                    borderRadius: 12,
                    colorBgContainer: colors.colorBgContainer,
                    fontFamily: 'Roboto',
                    colorLink: colors.colorLink,
                    colorLinkHover: colors.colorLinkHover,
                    colorLinkActive: colors.colorLinkActive,
                },
            }}
        >
            <App />
        </ConfigProvider>
    </React.StrictMode>
);
