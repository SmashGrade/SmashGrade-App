import { useMsal } from '@azure/msal-react';
import { IconLink } from '@components/ui-elements/IconLink.tsx';
import { UserProfile } from '@features/profile/UserProfile.tsx';
import useUserRoles, { UserRoles } from '@hooks/useUserRoles.ts';
import { Route as CourseIndexRoute } from '@routes/course/index.tsx';

import { Route as CurriculumRoute } from '@routes/curriculum/index.tsx';
import { Route as IndexRoute } from '@routes/index.tsx';
import { Route as ModuleIndexRoute } from '@routes/module/index.tsx';
import { Route as MyCourseRoute } from '@routes/my-course.tsx';
import { Route as OnboardingRoute } from '@routes/onboarding.tsx';
import { Route as SettingsRoute } from '@routes/settings.tsx';
import { Route as StudentModulesRoute } from '@routes/student/modules.tsx';
import { useRouter } from '@tanstack/react-router';
import { Button, Menu, MenuProps } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import logo from '../../assets/images/SmashGrade-AppIcon.png';
import {
    courseMenu,
    curriculumMenu,
    moduleMenu,
    myCourseMenu,
    myCurriculumMenu,
    onboardingMenu,
    settingsMenu,
    studentsMenu,
    userManagementMenu,
} from '../../i18n/dynamic-messages/menuMessages.ts';
import styles from './Navigation.module.scss';

const teacherNavItems: ItemType[] = [
    {
        label: <IconLink linkProps={{ to: MyCourseRoute.to }} icon={'sticky_note_2'} messageProps={myCourseMenu} />,
        key: 'my-course',
    },
    {
        label: <IconLink linkProps={{ to: IndexRoute.to }} icon={'school'} messageProps={studentsMenu} />,
        key: 'students',
    },
];

const studentNavItems: MenuProps['items'] = [
    {
        label: <IconLink linkProps={{ to: StudentModulesRoute.to }} icon={'school'} messageProps={myCurriculumMenu} />,
        key: 'my-curriculum',
        disabled: false,
    },
    {
        label: <IconLink linkProps={{ to: OnboardingRoute.to }} icon={'rocket_launch'} messageProps={onboardingMenu} />,
        key: 'onboarding',
        disabled: false,
    },
];

const courseAdminNavItems: ItemType[] = [
    {
        label: <IconLink linkProps={{ to: CurriculumRoute.to }} icon={'play_lesson'} messageProps={curriculumMenu} />,
        key: 'curriculum',
    },
    {
        label: (
            <IconLink linkProps={{ to: ModuleIndexRoute.to }} icon={'collections_bookmark'} messageProps={moduleMenu} />
        ),
        key: 'modules',
    },
    {
        label: <IconLink linkProps={{ to: CourseIndexRoute.to }} icon={'developer_guide'} messageProps={courseMenu} />,
        key: 'course',
    },
    {
        label: (
            <IconLink
                linkProps={{ to: IndexRoute.to }}
                icon={'supervised_user_circle'}
                messageProps={userManagementMenu}
            />
        ),
        key: 'user-management',
    },
];

const departmentManagerNavItems: ItemType[] = [
    {
        label: <IconLink linkProps={{ to: IndexRoute.to }} icon={'school'} messageProps={studentsMenu} />,
        key: 'students',
    },
];

const defaultNavItems: ItemType[] = [
    {
        label: <IconLink linkProps={{ to: SettingsRoute.to }} icon={'settings'} messageProps={settingsMenu} />,
        key: 'settings',
    },
];

const getNavItemsBasedOnRole = (role?: UserRoles) => {
    switch (role) {
        case UserRoles.Teacher:
            return teacherNavItems;
        case UserRoles.Student:
            return studentNavItems;
        case UserRoles.CourseAdmin:
            return courseAdminNavItems;
        case UserRoles.DepartmentManager:
            return departmentManagerNavItems;
        default:
            return [];
    }
};

export default function Navigation() {
    const router = useRouter();
    const currentPath = router.state.location.pathname;
    const [current, setCurrent] = useState(currentPath.substring(1) || 'onboarding');
    const userRoles = useUserRoles();
    const { instance } = useMsal();

    const onNavItemClick = useCallback<MenuClickEventHandler>((e) => setCurrent(e.key), []);
    const onLogout = useCallback(() => {
        void instance.logout();
    }, [instance]);

    const items: MenuProps['items'] = useMemo(() => {
        const roleBasedItems = getNavItemsBasedOnRole(userRoles?.[0]);
        return [...roleBasedItems, ...defaultNavItems];
    }, [userRoles]);

    const accountItems: MenuProps['items'] = useMemo(() => {
        return [
            {
                label: <UserProfile />,
                key: 'account',
                children: [
                    {
                        label: (
                            <Button style={{ width: '100%' }} type={'primary'} onClick={onLogout}>
                                <FormattedMessage
                                    id={'logout.menu'}
                                    defaultMessage={'Logout'}
                                    description={'Logout Menu'}
                                />
                            </Button>
                        ),
                        key: 'logout',
                    },
                ],
            },
        ];
    }, [onLogout]);

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
                className={styles.mainMenuContainer}
            />
            <Menu
                onClick={onNavItemClick}
                mode={'horizontal'}
                items={accountItems}
                className={styles.accountMenuContainer}
            />
        </div>
    );
}
