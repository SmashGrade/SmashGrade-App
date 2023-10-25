import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, MenuProps } from 'antd';
import { useState } from 'react';
import smashgradelogo from '../assets/images/smashgrade_logo_transparent.png';
import styles from './Navigation.module.scss';
import { FormattedMessage } from 'react-intl';

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
        label: <Link>Onboarding </Link>,
        key: 'onboarding',
        icon: <ProfileOutlined />,
        disabled: false,
    },
    {
        label: (
            <FormattedMessage id={'curriculum.menu'} defaultMessage={'Studiengang'} description={'Studiengang Menu'}>
                {(text) => <Link>{text}</Link>}
            </FormattedMessage>
        ),
        key: 'curriculum',
        icon: <BookOutlined />,
    },
    {
        label: (
            <FormattedMessage id={'module.menu'} defaultMessage={'Module'} description={'Module Menu'}>
                {(text) => <Link>{text}</Link>}
            </FormattedMessage>
        ),
        key: 'module',
        icon: <AppstoreOutlined />,
        disabled: false,
    },
    {
        label: (
            <FormattedMessage id={'course.menu'} defaultMessage={'Kurs'} description={'Kurs Menu'}>
                {(text) => <Link>{text}</Link>}
            </FormattedMessage>
        ),
        key: 'course',
        icon: <ReadOutlined />,
    },
    {
        label: (
            <FormattedMessage
                id={'user-management.menu'}
                defaultMessage={'Benutzerverwaltung'}
                description={'Benutzerverwaltung Menu'}
            >
                {(text) => <Link>{text}</Link>}
            </FormattedMessage>
        ),
        key: 'user-management',
        icon: <UserOutlined />,
    },
    {
        label: (
            <FormattedMessage id={'my-course.menu'} defaultMessage={'Meine Kurse'} description={'Meine Kurse Menu'}>
                {(text) => <Link>{text}</Link>}
            </FormattedMessage>
        ),
        key: 'my-course',
        icon: <HeartOutlined />,
        disabled: true,
    },
    {
        label: (
            <FormattedMessage
                id={'my-curriculum.menu'}
                defaultMessage={'Mein Studium'}
                description={'Mein Studium Menu'}
            >
                {(text) => <Link>{text}</Link>}
            </FormattedMessage>
        ),
        key: 'my-curriculum',
        icon: <ProfileOutlined />,
        disabled: true,
    },
];

export default function Navigation() {
    const [current, setCurrent] = useState('onboarding');
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        void navigate({
            to: `/${e.key}`,
        });
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
