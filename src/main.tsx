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
                        headerBg: '#95223F',
                        colorTextHeading: '#FFFFFF',
                    },
                    Table: {
                        headerBg: '#95223F',
                        colorTextHeading: '#FFFFFF',
                    },
                },
                token: {
                    colorPrimary: '#C6264E',
                    borderRadius: 12,
                    colorBgContainer: '#FFFFFF',
                    borderRadiusLG: 8,
                    fontFamily: 'Roboto',
                    colorLink: '#C6264E',
                    colorLinkHover: '#3D3D3C',
                    colorLinkActive: '#5F1530',
                },
            }}
        >
            <App />
        </ConfigProvider>
    </React.StrictMode>
);
