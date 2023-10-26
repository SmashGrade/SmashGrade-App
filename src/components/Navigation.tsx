import {
    AppstoreOutlined,
    BookOutlined,
    HeartOutlined,
    ProfileOutlined,
    ReadOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import { Menu, MenuProps } from 'antd';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import smashgradelogo from '../assets/images/smashgrade_logo_transparent.png';
import styles from './Navigation.module.scss';

const items: MenuProps['items'] = [
    {
        label: <Link>Onboarding</Link>,
        key: 'onboarding',
        icon: <ProfileOutlined />,
        disabled: false,
    },
    {
        label: (
            <Link>
                <FormattedMessage
                    id={'curriculum.menu'}
                    defaultMessage={'Studiengang'}
                    description={'Studiengang Menu'}
                />
            </Link>
        ),
        key: 'curriculum',
        icon: <BookOutlined />,
    },
    {
        label: (
            <Link>
                <FormattedMessage id={'module.menu'} defaultMessage={'Module'} description={'Module Menu'} />
            </Link>
        ),
        key: 'module',
        icon: <AppstoreOutlined />,
        disabled: false,
    },
    {
        label: (
            <Link>
                <FormattedMessage id={'course.menu'} defaultMessage={'Kurs'} description={'Kurs Menu'} />
            </Link>
        ),
        key: 'course',
        icon: <ReadOutlined />,
    },
    {
        label: (
            <Link>
                <FormattedMessage
                    id={'user-management.menu'}
                    defaultMessage={'Benutzerverwaltung'}
                    description={'Benutzerverwaltung Menu'}
                />
            </Link>
        ),
        key: 'user-management',
        icon: <UserOutlined />,
    },
    {
        label: (
            <Link>
                <FormattedMessage
                    id={'my-course.menu'}
                    defaultMessage={'Meine Kurse'}
                    description={'Meine Kurse Menu'}
                />
            </Link>
        ),
        key: 'my-course',
        icon: <HeartOutlined />,
        disabled: true,
    },
    {
        label: (
            <Link>
                <FormattedMessage
                    id={'my-curriculum.menu'}
                    defaultMessage={'Mein Studium'}
                    description={'Mein Studium Menu'}
                />
            </Link>
        ),
        key: 'my-curriculum',
        icon: <ProfileOutlined />,
        disabled: true,
    },
];

export default function Navigation() {
    const [current, setCurrent] = useState('onboarding');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
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
    );
}
