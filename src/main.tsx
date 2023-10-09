import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ConfigProvider } from 'antd';

const queryClient = new QueryClient()

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
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ConfigProvider>
    </React.StrictMode>
);
