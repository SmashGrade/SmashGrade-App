import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    //  Seed Token
                    // colorPrimary: 'red',
                    //  borderRadius: 6,
                    //
                    // Alias Token
                    // colorBgContainer: 'green',
                },
            }}
        >
            <App />
        </ConfigProvider>
    </React.StrictMode>
);
