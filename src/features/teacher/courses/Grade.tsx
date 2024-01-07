import { useEffect, useState } from 'react';

import Rating from '@features/student/modules/Rating.tsx';
import GradeCard from '@features/teacher/courses/GradeCard.tsx';
import styles from '@pages/MyCoursePage.module.scss';
import { Divider } from 'antd';
import { FormattedMessage } from 'react-intl';

interface Grade {
    studentName: string;
    field: string;
    rating: number;
    key: number;
}

function getWindowHeight() {
    return window.innerHeight;
}

function useWindowHeight() {
    const [windowHeight, setWindowHeight] = useState(getWindowHeight());

    useEffect(() => {
        function handleResize() {
            setWindowHeight(getWindowHeight());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowHeight;
}

export default function Grade() {
    const calcHeight = useWindowHeight() * 0.25;
    const grades: Grade[] = [
        {
            studentName: 'John Doe',
            field: 'Wirtschaftsinformatik',
            rating: 4.5,
            key: 1,
        },
        {
            studentName: 'Jane Doe',
            field: 'Softwareentwicklung',
            rating: 3.1,
            key: 2,
        },
    ];

    return (
        <div className={`${styles.background} ${styles.setWidth}`}>
            <div style={{ overflowY: 'auto', height: grades.length > 6 ? calcHeight : 'auto' }}>
                {grades.map((grade) => {
                    return (
                        <GradeCard
                            studentName={grade.studentName}
                            field={grade.field}
                            rating={grade.rating}
                            key={grade.key}
                        />
                    );
                })}
            </div>
            <Divider className={styles.divider} />
            <div className={`${styles.flexRow} ${styles.baseInsetsLeftRight}`}>
                <h3>
                    <FormattedMessage
                        id={'grade.average'}
                        description={'Durchschnitt einer Prüfung, Kurses, etc'}
                        defaultMessage={'Durchschnitt'}
                    />
                </h3>
                <Rating rating={3.8} />
            </div>
        </div>
    );
}
