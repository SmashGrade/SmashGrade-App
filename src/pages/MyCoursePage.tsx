import { BookFilled, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';
import type { MenuProps } from 'antd';

import styles from './MyCoursePage.module.scss';
import Grade from '@features/teacher/courses/Grade.tsx';
import GradeInput from '@features/teacher/courses/GradeInput.tsx';
import Qualification from '@features/teacher/courses/Qualification.tsx';

const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.info('click', e);
};

const items: MenuProps['items'] = [
    {
        label: '1st menu item',
        key: '1',
    },
    {
        label: '2nd menu item',
        key: '2',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
    {
        label: '4rd menu item',
        key: '4',
    },
];

const menuProps = {
    items,
    onClick: handleMenuClick,
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const menuItems: MenuItem[] = [
    getItem('Navigation One', 'sub1', <BookFilled />),
    getItem('Navigation Two', 'sub2', <BookFilled />),
    getItem('Navigation Three', 'sub4', <BookFilled />),
];

const menuOnClick: MenuProps['onClick'] = (e) => {
    console.info('click', e);
};

export default function MyCoursePage() {
    return (
        <>
            <div className={styles.myCoursePage}>
                <div className={`${styles.courseNavigation} ${styles.background}`}>
                    <h3>Kurse</h3>
                    <Dropdown menu={menuProps}>
                        <Button>
                            <Space>
                                Button
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    <Menu onClick={menuOnClick} items={menuItems} className={styles.menu} style={{ width: '90%' }} />
                </div>
                <Qualification field={'Wirtschaftsinformatik'} subheading={'Qualifikationsnachweise'} />
                <div className={styles.gradeContainer}>
                    <div className={`${styles.setWidth} ${styles.background}`}>
                        <h3>Test #1</h3>
                        <div className={styles.flexRowStart}>
                            <GradeInput description={'Bewertung'} placeholder={'Schriftliche Prüfung'} />
                            <GradeInput description={'Gewichtung'} placeholder={'30%'} />
                        </div>
                    </div>
                    <Grade />
                </div>
            </div>
        </>
    );
}
