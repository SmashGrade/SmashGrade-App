import { ThemeConfig } from 'antd';
import colors from '../colors.module.scss';

export const antdTheme: ThemeConfig = {
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
};
