import { courseRoute, curriculumRoute, onboardingRoute, studentModuleRoute } from '@pages/routes/routes.ts';
import { Link, useRouter } from '@tanstack/react-router';
import { Menu, MenuProps } from 'antd';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import logo from '../assets/images/SmashGrade-AppIcon.png';
import styles from './Navigation.module.scss';

export default function Navigation() {
    const router = useRouter();
    const currentPath = router.state.location.pathname;
    const [current, setCurrent] = useState(currentPath.substring(1) || 'onboarding');
    const onNavItemClick = useCallback<MenuClickEventHandler>((e) => setCurrent(e.key), []);

    const items: MenuProps['items'] = useMemo(() => {
        return [
            {
                label: (
                    <Link to={curriculumRoute.to}>
                        <div className={styles.menuItemIconAbove}>
                            <span className={'material-icons-round'} style={{ fontSize: '36px' }}>
                                play_lesson
                            </span>
                            <FormattedMessage
                                id={'curriculum.menu'}
                                defaultMessage={'Studiengänge'}
                                description={'Studiengang Menu'}
                            />
                        </div>
                    </Link>
                ),
                key: 'curriculum',
            },
            {
                label: (
                    <Link>
                        <div className={styles.menuItemIconAbove}>
                            <span className={'material-icons-round'} style={{ fontSize: '36px' }}>
                                collections_bookmark
                            </span>
                            <FormattedMessage
                                id={'module.menu'}
                                defaultMessage={'Module'}
                                description={'Module Menu'}
                            />
                        </div>
                    </Link>
                ),
                key: 'modules',
            },
            {
                label: (
                    <Link to={courseRoute.to}>
                        <div className={styles.menuItemIconAbove}>
                            <span className={'material-icons-round'} style={{ fontSize: '36px' }}>
                                book
                            </span>
                            <FormattedMessage id={'course.menu'} defaultMessage={'Kurse'} description={'Kurse Menu'} />
                        </div>
                    </Link>
                ),
                key: 'course',
            },
            {
                label: (
                    <Link>
                        <div className={styles.menuItemIconAbove}>
                            <span className={'material-icons-round'} style={{ fontSize: '36px' }}>
                                supervised_user_circle
                            </span>
                            <FormattedMessage
                                id={'user-management.menu'}
                                defaultMessage={'Benutzer'}
                                description={'Benutzer Menu'}
                            />
                        </div>
                    </Link>
                ),
                key: 'user-management',
            },
            {
                label: (
                    <Link>
                        <div className={styles.menuItemIconAbove}>
                            <span className={'material-icons-round'} style={{ fontSize: '36px' }}>
                                school
                            </span>
                            <FormattedMessage
                                id={'students.menu'}
                                defaultMessage={'Studenten'}
                                description={'Studenten Menu'}
                            />
                        </div>
                    </Link>
                ),
                key: 'students',
                disabled: true,
            },
            {
                label: (
                    <Link>
                        <div className={styles.menuItemIconAbove}>
                            <span className={'material-icons-round'} style={{ fontSize: '36px' }}>
                                sticky_note_2
                            </span>
                            <FormattedMessage
                                id={'my-course.menu'}
                                defaultMessage={'Meine Kurse'}
                                description={'Meine Kurse Menu'}
                            />
                        </div>
                    </Link>
                ),
                key: 'my-course',
                disabled: true,
            },
            {
                label: (
                    <Link to={studentModuleRoute.to}>
                        <FormattedMessage
                            id={'my-curriculum.menu'}
                            defaultMessage={'Mein Studium'}
                            description={'Mein Studium Menu'}
                        />
                    </Link>
                ),
                key: 'my-curriculum',
                disabled: false,
            },
            {
                label: <Link to={onboardingRoute.to}>Onboarding</Link>,
                key: 'onboarding',
                disabled: false,
            },
        ];
    }, []);

    const accountItems: MenuProps['items'] = useMemo(() => {
        return [
            {
                label: (
                    <Link>
                        <div className={styles.menuItemIconAbove}>
                            <span className={'material-icons-round'} style={{ fontSize: '36px' }}>
                                account_circle
                            </span>
                            <FormattedMessage
                                id={'account.menu'}
                                defaultMessage={'Account'}
                                description={'Account Menu'}
                            />
                        </div>
                    </Link>
                ),
                key: 'account',
            },
        ];
    }, []);

    return (
        <div className={styles.navigationContainer}>
            <img src={logo} alt={'SmashGrade - Höhere Fachschule für Technik Mittelland'} className={styles.logo} />
            <Menu
                onClick={onNavItemClick}
                selectedKeys={[current]}
                mode={'horizontal'}
                items={items}
                className={styles.menuContainer}
            />
            <Menu
                onClick={onNavItemClick}
                selectedKeys={[current]}
                mode={'horizontal'}
                items={accountItems}
                className={styles.accountMenu}
            />
        </div>
    );
}
