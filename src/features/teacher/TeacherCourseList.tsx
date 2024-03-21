import { BookFilled } from '@ant-design/icons';
import ExamList from '@features/teacher/ExamList.tsx';
import styles from '@pages/MyCoursePage.module.scss';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCurriculums } from '@features/teacher/api/curriculumApi.ts';
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

export default function TeacherCourseList() {
    const intl = useIntl();

    const curriculums = useSuspenseQuery({
        queryKey: ['teacherCurriculums'],
        queryFn: () => getCurriculums(),
    }).data;

    const dropdownItems = curriculums.map((curriculum, index) => ({
        label: curriculum.startDate,
        value: index,
    }));

    const getMenuItems = useCallback(
        (key: number) => {
            return curriculums[key].courses.map((course, index) =>
                getItem(course.description, index.toString(), <BookFilled />)
            );
        },
        [curriculums]
    );

    const [menuItems, setMenuItems] = useState<MenuItem[]>(getMenuItems(0));
    const [current, setCurrent] = useState<MenuItemType>(menuItems[0] as MenuItemType);
    const [currentCurriculum, setCurrentCurriculum] = useState<number>(0);
    const [currentCourseId, setCurrentCourseId] = useState<number>(curriculums[currentCurriculum].courses[0].id);

    const handleOnChange = useCallback(
        (e: number) => {
            setMenuItems(getMenuItems(e));
            setCurrentCurriculum(e);
            // Automatically select the first menu item when the selected year changes
            setCurrent(menuItems[0] as MenuItemType);
            setCurrentCourseId(curriculums[e].courses[0].id);
        },
        [curriculums, getMenuItems, menuItems]
    );

    const menuOnClick = useCallback(
        (e: MenuInfo) => {
            setCurrent(menuItems[parseInt(e.key)] as MenuItemType);
            setCurrentCourseId(curriculums[currentCurriculum].courses[parseInt(e.key)].id);
        },
        [currentCurriculum, curriculums, menuItems]
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
            <ExamList field={current?.label as string} courseId={currentCourseId} />
        </div>
    );
}
