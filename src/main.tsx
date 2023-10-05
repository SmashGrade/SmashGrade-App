import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import './global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                components: {
                    Collapse: {
                        headerBg: '#C6264E',
                        colorTextHeading: '#FFFFFF',
                    },
                    Table: {
                        headerBg: '#C6264E',
                        colorTextHeading: '#FFFFFF',
                    },
                },
                token: {
                    colorPrimary: '#C6264E',
                    borderRadius: 12,
                    colorBgContainer: '#FFFFFF',
                    fontFamily: 'Roboto',
                    colorLink: '#C6264E',
                    colorLinkHover: '#3D3D3C',
                    colorLinkActive: '#95223F',
                },
            }}
        >
            <App />
        </ConfigProvider>
    </React.StrictMode>
);
