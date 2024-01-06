import { useEffect, useState } from 'react';

import Rating from '@features/student/modules/Rating.tsx';
import GradeCard from '@features/teacher/courses/GradeCard.tsx';
import styles from '@pages/MyCoursePage.module.scss';
import { Divider } from 'antd';

interface grade {
    studentName: string;
    field: string;
    rating: number;
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
    const grades: grade[] = [
        {
            studentName: 'John Doe',
            field: 'Wirtschaftsinformatik',
            rating: 4.5,
        },
        {
            studentName: 'Jane Doe',
            field: 'Softwareentwicklung',
            rating: 3.1,
        },
    ];

    return (
        <div className={`${styles.background} ${styles.setWidth}`}>
            <div style={{ overflowY: 'auto', height: grades.length > 6 ? calcHeight : 'auto' }}>
                {grades.map((grade, index) => {
                    return (
                        <GradeCard
                            studentName={grade.studentName}
                            field={grade.field}
                            rating={grade.rating}
                            key={index}
                        />
                    );
                })}
            </div>
            <Divider className={styles.divider} />
            <div className={`${styles.flexRow} ${styles.baseInsetsLeftRight}`}>
                <h3>Durchschnitt:</h3>
                <Rating rating={3.8} />
            </div>
        </div>
    );
}
