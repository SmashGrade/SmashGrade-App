import { BookFilled } from '@ant-design/icons';
import { Menu, Select } from 'antd';
import type { MenuProps } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useIntl } from 'react-intl';
import React, { useCallback, useState } from 'react';
import { MenuInfo } from 'node_modules/rc-menu/lib/interface';

import styles from './MyCoursePage.module.scss';
import Grade from '@features/teacher/courses/Grade.tsx';
import GradeProperty from '@features/teacher/courses/GradeProperty.tsx';
import Qualification from '@features/teacher/courses/Qualification.tsx';

interface Exam {
    id: number;
    description: string;
    weight: number;
    type: string;
}

interface Teacher {
    id: number;
    name: string;
}

interface CustomCourse {
    startDate: string;
    course: Course[];
}

interface Course {
    id: number;
    description: string;
    exams: Exam[];
    teachers: Teacher[];
}

type MenuItem = Required<MenuProps>['items'][number];

const customCourses: CustomCourse[] = [
    {
        startDate: '2020',
        course: [
            {
                id: 0,
                description: 'Datenbanken I',
                exams: [
                    {
                        id: 1,
                        description: 'Test #1',
                        weight: 30,
                        type: 'Schriftliche Prüfung',
                    },
                    {
                        id: 2,
                        description: 'Test #2',
                        weight: 30,
                        type: 'Schriftliche Prüfung',
                    },
                    {
                        id: 3,
                        description: 'Test #3',
                        weight: 30,
                        type: 'Schriftliche Prüfung',
                    },
                ],
                teachers: [
                    {
                        id: 1,
                        name: 'Max Mustermann',
                    },
                ],
            },
            {
                id: 2,
                description: 'Datenbanken II',
                exams: [
                    {
                        id: 4,
                        description: 'Test #1',
                        weight: 30,
                        type: 'Schriftliche Prüfung',
                    },
                    {
                        id: 5,
                        description: 'Test #2',
                        weight: 30,
                        type: 'Schriftliche Prüfung',
                    },
                    {
                        id: 6,
                        description: 'Test #3',
                        weight: 30,
                        type: 'Schriftliche Prüfung',
                    },
                ],
                teachers: [
                    {
                        id: 1,
                        name: 'Max Mustermann',
                    },
                ],
            },
            {
                id: 3,
                description: 'Datenstrukturen und Algorithmen',
                exams: [
                    {
                        id: 7,
                        description: 'Test #1',
                        weight: 30,
                        type: 'Schriftliche Prüfung',
                    },
                    {
                        id: 8,
                        description: 'Test #2',
                        weight: 30,
                        type: 'Schriftliche Prüfung',
                    },
                    {
                        id: 9,
                        description: 'Test #3',
                        weight: 30,
                        type: 'Schriftliche Prüfung',
                    },
                ],
                teachers: [
                    {
                        id: 1,
                        name: 'Max Mustermann',
                    },
                ],
            },
        ],
    },
    {
        startDate: '2021',
        course: [
            {
                id: 0,
                description: 'Objektorientierte Programmierung I',
                exams: [
                    {
                        id: 1,
                        description: 'Test #1',
                        weight: 30,
                        type: 'Mündliche Prüfung',
                    },
                    {
                        id: 2,
                        description: 'Test #2',
                        weight: 60,
                        type: 'Schriftliche Prüfung',
                    },
                    {
                        id: 3,
                        description: 'Test #3',
                        weight: 10,
                        type: 'Mündliche Prüfung',
                    },
                ],
                teachers: [
                    {
                        id: 2,
                        name: 'John Doe',
                    },
                ],
            },
            {
                id: 2,
                description: 'Objektorientierte Programmierung II',
                exams: [
                    {
                        id: 4,
                        description: 'Test #1',
                        weight: 40,
                        type: 'Mündliche Prüfung',
                    },
                    {
                        id: 5,
                        description: 'Test #2',
                        weight: 20,
                        type: 'Mündliche Prüfung',
                    },
                    {
                        id: 6,
                        description: 'Test #3',
                        weight: 40,
                        type: 'Schriftliche Prüfung',
                    },
                ],
                teachers: [
                    {
                        id: 2,
                        name: 'John Doe',
                    },
                ],
            },
            {
                id: 3,
                description: 'Software-Architektur',
                exams: [
                    {
                        id: 7,
                        description: 'Test #1',
                        weight: 50,
                        type: 'Schriftliche Prüfung',
                    },
                    {
                        id: 8,
                        description: 'Test #2',
                        weight: 30,
                        type: 'Mündliche Prüfung',
                    },
                    {
                        id: 9,
                        description: 'Test #3',
                        weight: 20,
                        type: 'Mündliche Prüfung',
                    },
                ],
                teachers: [
                    {
                        id: 2,
                        name: 'John Doe',
                    },
                ],
            },
        ],
    },
];

const dropdownItems = customCourses.map((customCourse, index) => ({
    label: customCourse.startDate,
    value: index,
}));

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

const getMenuItems = (key: number) => {
    return customCourses[key].course.map((course, index) =>
        getItem(course.description, index.toString(), <BookFilled />)
    );
};

export default function MyCoursePage() {
    const intl = useIntl();
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
            <div className={styles.gradeContainer}>
                <div className={`${styles.setWidth} ${styles.background}`}>
                    <h3>Test #1</h3>
                    <div className={styles.flexRowStart}>
                        <GradeProperty
                            description={intl.formatMessage({
                                id: 'grade.assessment',
                                defaultMessage: 'Bewertung',
                                description: 'Bewertung eines Qualifikationsnachweises',
                            })}
                            placeholder={'Schriftliche Prüfung'}
                        />
                        <GradeProperty
                            description={intl.formatMessage({
                                id: 'grade.weighting',
                                defaultMessage: 'Gewichtung',
                                description: 'Gewichtung eines Qualifikationsnachweises',
                            })}
                            placeholder={'30%'}
                        />
                    </div>
                </div>
                <Grade />
            </div>
        </div>
    );
}
