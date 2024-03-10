import { BookFilled } from '@ant-design/icons';
import Qualification from '@features/teacher/courses/Qualification.tsx';
import styles from '@pages/MyCoursePage.module.scss';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCurriculums } from '@features/teacher/curriculum/curriculumApi.ts';
import { Menu, MenuProps, Select } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { MenuInfo } from 'node_modules/rc-menu/lib/interface';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
};

export default function TeacherCurriculum() {
    const intl = useIntl();

    const curriculums = useSuspenseQuery({
        queryKey: ['teacherCurriculums'],
        queryFn: () => getCurriculums(),
    }).data;

    const dropdownItems = curriculums.map((curriculum, index) => ({
        label: curriculum.startDate,
        value: index,
    }));

    const getMenuItems = (key: number) => {
        return curriculums[key].courses.map((course, index) =>
            getItem(course.description, index.toString(), <BookFilled />)
        );
    };

    const [menuItems, setMenuItems] = useState<MenuItem[]>(getMenuItems(0));
    const [current, setCurrent] = useState<MenuItemType>(menuItems[0] as MenuItemType);

    const handleOnChange = useCallback(
        (e: number) => {
            setMenuItems(getMenuItems(e));
            // Automatically select the first menu item when the selected year changes
            setCurrent(menuItems[0] as MenuItemType);
        },
        [menuItems]
    );

    const menuOnClick = useCallback(
        (e: MenuInfo) => {
            setCurrent(menuItems[parseInt(e.key)] as MenuItemType);
        },
        [menuItems]
    );

    return (
        <div className={styles.myCoursePage}>
            <div className={`${styles.courseNavigation} ${styles.background}`}>
                <h3>
                    {intl.formatMessage({
                        id: 'course.menu',
                    })}
                </h3>
                <Select defaultValue={0} options={dropdownItems} onChange={handleOnChange} />
                <Menu
                    onClick={menuOnClick}
                    items={menuItems}
                    selectedKeys={[current?.key as string]}
                    className={styles.menu}
                    style={{ width: '90%' }}
                />
            </div>
            <Qualification
                field={current?.label as string}
                subheading={intl.formatMessage({
                    id: 'course.qualification',
                    description: 'Qualifikationsnachweise eines Kurses',
                    defaultMessage: 'Qualifikationsnachweise',
                })}
            />
            *
        </div>
    );
}
