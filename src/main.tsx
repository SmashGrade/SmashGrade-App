import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import colors from './colors.module.scss';
import './global.scss';

const queryClient = new QueryClient()

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
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ConfigProvider>
    </React.StrictMode>
);
