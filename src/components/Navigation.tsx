import {
    AppstoreOutlined,
    BookOutlined,
    HeartOutlined,
    ProfileOutlined,
    ReadOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { courseRoute, curriculumRoute, onboardingRoute } from '@pages/routes/routes.ts';
import { Link, useRouter } from '@tanstack/react-router';
import { Menu, MenuProps } from 'antd';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import smashgradelogo from '../assets/images/smashgrade_logo_transparent.png';
import styles from './Navigation.module.scss';

export default function Navigation() {
    const router = useRouter();
    const currentPath = router.state.location.pathname;
    const [current, setCurrent] = useState(currentPath.substring(1) || 'onboarding');
    const onNavItemClick = useCallback<MenuClickEventHandler>((e) => setCurrent(e.key), []);

    const items: MenuProps['items'] = useMemo(() => {
        return [
            {
                label: <Link to={onboardingRoute.to}>Onboarding</Link>,
                key: 'onboarding',
                icon: <ProfileOutlined />,
                disabled: false,
            },
            {
                label: (
                    <Link to={curriculumRoute.to}>
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
                key: 'modules',
                icon: <AppstoreOutlined />,
                disabled: false,
            },
            {
                label: (
                    <Link to={courseRoute.to}>
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
    }, []);

    return (
        <div className={styles.navigationContainer}>
            <img
                src={smashgradelogo}
                alt={'SmashGrade - Höhere Fachschule für Technik Mittelland'}
                className={styles.logo}
            />
            <Menu
                onClick={onNavItemClick}
                selectedKeys={[current]}
                mode={'horizontal'}
                items={items}
                className={styles.menuContainer}
            />
        </div>
    );
}
