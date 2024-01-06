import { useMsal } from '@azure/msal-react';
import { IconLink } from '@components/ui-elements/IconLink.tsx';
import { UserProfile } from '@features/profile/UserProfile.tsx';
import useUserRoles from '@hooks/useUserRoles.ts';
import {
    courseRoute,
    curriculumRoute,
    myCourseRoute,
    onboardingRoute,
    settingsRoute,
    studentModuleRoute,
} from '@pages/routes/routes.ts';
import { useRouter } from '@tanstack/react-router';
import { Menu, MenuProps } from 'antd';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import logo from '../../assets/images/SmashGrade-AppIcon.png';
import styles from './Navigation.module.scss';

export default function Navigation() {
    const router = useRouter();
    const currentPath = router.state.location.pathname;
    const [current, setCurrent] = useState(currentPath.substring(1) || 'onboarding');
    const onNavItemClick = useCallback<MenuClickEventHandler>((e) => setCurrent(e.key), []);
    const userRoles = useUserRoles();
    const { instance } = useMsal();

    const items: MenuProps['items'] = useMemo(() => {
        return [
            {
                label: (
                    <IconLink
                        to={curriculumRoute.to}
                        icon={'play_lesson'}
                        messageId={'curriculum.menu'}
                        defaultMessage={'Studiengänge'}
                        description={'Studiengang Menu'}
                    />
                ),
                key: 'curriculum',
            },
            {
                label: (
                    <IconLink
                        icon={'collections_bookmark'}
                        messageId={'module.menu'}
                        defaultMessage={'Module'}
                        description={'Module Menu'}
                    />
                ),
                key: 'modules',
            },
            {
                label: (
                    <IconLink
                        to={courseRoute.to}
                        icon={'developer_guide'}
                        messageId={'course.menu'}
                        defaultMessage={'Kurse'}
                        description={'Kurse Menu'}
                    />
                ),
                key: 'course',
            },
            {
                label: (
                    <IconLink
                        icon={'supervised_user_circle'}
                        messageId={'user-management.menu'}
                        defaultMessage={'Benutzer'}
                        description={'Benutzer Menu'}
                    />
                ),
                key: 'user-management',
            },
            {
                label: (
                    <IconLink
                        icon={'school'}
                        messageId={'students.menu'}
                        defaultMessage={'Studenten'}
                        description={'Studenten Menu'}
                    />
                ),
                key: 'students',
                disabled: false,
            },
            {
                label: (
                    <IconLink
                        icon={'sticky_note_2'}
                        to={myCourseRoute.to}
                        messageId={'my-course.menu'}
                        defaultMessage={'Meine Kurse'}
                        description={'Meine Kurse Menu'}
                    />
                ),
                key: 'my-course',
                disabled: false,
            },
            {
                label: (
                    <IconLink
                        to={studentModuleRoute.to}
                        messageId={'my-curriculum.menu'}
                        defaultMessage={'Mein Studium'}
                        description={'Mein Studium Menu'}
                    />
                ),
                key: 'my-curriculum',
                disabled: false,
            },
            {
                label: (
                    <IconLink
                        to={onboardingRoute.to}
                        messageId={'onboarding.menu'}
                        defaultMessage={'Onboarding'}
                        description={'Onboarding Menu'}
                    />
                ),
                key: 'onboarding',
                disabled: false,
            },
        ];
    }, []);

    const accountItems: MenuProps['items'] = useMemo(() => {
        return [
            {
                label: <UserProfile />,
                key: 'account',
                children: [
                    {
                        label: (
                            <IconLink
                                to={settingsRoute.to}
                                messageId={'settings.menu'}
                                defaultMessage={'Settings'}
                                description={'Settings Menu'}
                            />
                        ),
                        key: 'settings',
                        disabled: false,
                    },
                    {
                        label: (
                            <div
                                onClick={() => {
                                    void instance.logout();
                                }}
                            >
                                <FormattedMessage
                                    id={'logout.menu'}
                                    defaultMessage={'Logout'}
                                    description={'Logout Menu'}
                                />
                            </div>
                        ),
                        key: 'logout',
                    },
                ],
            },
        ];
    }, [instance]);

    return (
        <div className={styles.navigationContainer}>
            <div className={styles.logoContainer}>
                <img src={logo} alt={'SmashGrade - Höhere Fachschule für Technik Mittelland'} className={styles.logo} />
                <div className={styles.titleContainer}>
                    <h3 className={styles.title}>SmashGrade</h3>
                    <p className={styles.title}>{userRoles?.[0]}</p>
                </div>
            </div>

            <Menu
                onClick={onNavItemClick}
                selectedKeys={[current]}
                mode={'horizontal'}
                items={items}
                className={styles.menuContainer}
            />
            <Menu
                onClick={onNavItemClick}
                selectedKeys={['logout']}
                mode={'horizontal'}
                items={accountItems}
                className={styles.accountMenu}
            />
        </div>
    );
}
