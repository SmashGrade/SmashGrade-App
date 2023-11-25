import { AuditOutlined, BookFilled, DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Input, Menu, Space } from 'antd';
import type { MenuProps } from 'antd';

import styles from './MyCoursePage.module.scss';
import Rating from '@features/student/modules/Rating.tsx';

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
                <div title={'Kurse'} className={`${styles.courseNavigation} ${styles.background}`}>
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
                <div title={'Kurs XYZ'} className={`${styles.proofOfQualification} ${styles.background}`}>
                    <h3>Kurs XYZ</h3>
                    <p>Qualifikationsnachweise</p>
                    <div className={styles.setWidth}>
                        <div className={`${styles.outlined} ${styles.flexRow} ${styles.componentChildren}`}>
                            <div className={styles.flexCol}>
                                <h3>Test #1</h3>
                                <div className={styles.flexRow}>
                                    <AuditOutlined />
                                    <p>30%</p>
                                </div>
                            </div>
                            <Rating rating={5.0} />
                        </div>
                        <div className={`${styles.outlined} ${styles.flexRow} ${styles.componentChildren}`}>
                            <div className={styles.flexCol}>
                                <h3>Test #1</h3>
                                <div className={styles.flexRow}>
                                    <AuditOutlined />
                                    <p>30%</p>
                                </div>
                            </div>
                            <Rating rating={5.0} />
                        </div>
                        <div className={`${styles.outlined} ${styles.flexRow} ${styles.componentChildren}`}>
                            <div className={styles.flexCol}>
                                <h3>Test #1</h3>
                                <div className={styles.flexRow}>
                                    <AuditOutlined />
                                    <p>30%</p>
                                </div>
                            </div>
                            <Rating rating={5.0} />
                        </div>
                    </div>
                </div>
                <div className={styles.gradeContainer}>
                    <div className={`${styles.setWidth} ${styles.background}`}>
                        <h3>Test #1</h3>
                        <div className={styles.flexRowStart}>
                            <div className={styles.flexCol}>
                                <p>Bewertung</p>
                                <Input placeholder={'Schriftliche Prüfung'} />
                            </div>
                            <div className={styles.flexCol}>
                                <p>Gewichtung</p>
                                <Input placeholder={'50%'} />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.background} ${styles.setWidth}`}>
                        <div className={`${styles.outlined} ${styles.gradeComponent}`}>
                            <div className={styles.gradeComponent}>
                                <UserOutlined />
                                <div className={styles.componentChildren}>
                                    <h3>John Doe</h3>
                                    <p>Wirtschaftsinformatik</p>
                                </div>
                            </div>
                            <Rating rating={5.0} />
                        </div>
                        <div className={`${styles.outlined} ${styles.gradeComponent}`}>
                            <div className={styles.gradeComponent}>
                                <UserOutlined />
                                <div className={styles.componentChildren}>
                                    <h3>Jane Doe</h3>
                                    <p>Softwareentwicklung</p>
                                </div>
                            </div>
                            <Rating rating={3.0} />
                        </div>
                        <Divider className={styles.divider} />
                        <Rating rating={5.0} />
                    </div>
                </div>
            </div>
        </>
    );
}
