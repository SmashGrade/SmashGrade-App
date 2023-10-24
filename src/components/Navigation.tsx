import { Menu, MenuProps } from 'antd';
import { useState } from 'react';
import smashgradelogo from '../assets/images/nav_logo_250.png';
import styles from './Navigation.module.scss';

import {
    BookOutlined,
    AppstoreOutlined,
    UserOutlined,
    ReadOutlined,
    HeartOutlined,
    ProfileOutlined,
} from '@ant-design/icons';

const items: MenuProps['items'] = [
    {
        label: 'Onboarding',
        key: 'onboarding',
        icon: <ProfileOutlined />,
        disabled: false,
    },
    {
        label: 'Studiengang',
        key: 'curriculum',
        icon: <BookOutlined />,
    },
    {
        label: 'Module',
        key: 'module',
        icon: <AppstoreOutlined />,
        disabled: false,
    },
    {
        label: 'Kurse',
        key: 'course',
        icon: <ReadOutlined />,
    },
    {
        label: 'Benutzerverwaltung',
        key: 'usermanagement',
        icon: <UserOutlined />,
    },
    {
        label: 'Meine Kurse',
        key: 'mycourse',
        icon: <HeartOutlined />,
        disabled: true,
    },
    {
        label: 'Mein Studium',
        key: 'mycurriculum',
        icon: <ProfileOutlined />,
        disabled: true,
    },
    {
        label: (
            <a href={'https://ant.design'} target={'_blank'} rel={'noopener noreferrer'}>
                Navigation Four - Link
            </a>
        ),
        key: 'alipay',
    },
];

export default function Navigation() {
    const [current, setCurrent] = useState('onboarding');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        <>
            <div className={styles.navigationContainer}>
                <img
                    src={smashgradelogo}
                    alt={'SmashGrade - Höhere Fachschule für Technik Mittelland'}
                    className={styles.logo}
                />
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode={'horizontal'}
                    items={items}
                    className={styles.menuContainer}
                />
            </div>
        </>
    );
}
