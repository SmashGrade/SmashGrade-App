import { useState } from 'react';

import Rating from '@features/student/modules/Rating.tsx';
import GradeCard from '@features/teacher/courses/GradeCard.tsx';
import styles from '@pages/MyCoursePage.module.scss';
import { Divider } from 'antd';

interface grade {
    studentName: string;
    field: string;
    rating: number;
}

export default function Grade() {
    const [grades, setGrades] = useState<grade[]>([
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
    ]);

    return (
        <div className={`${styles.background} ${styles.setWidth}`}>
            {grades.map((grade, index) => {
                return (
                    <GradeCard studentName={grade.studentName} field={grade.field} rating={grade.rating} key={index} />
                );
            })}
            <Divider className={styles.divider} />
            <div className={`${styles.flexRow} ${styles.baseInsetsLeftRight}`}>
                <h3>Durchschnitt:</h3>
                <Rating rating={3.8} />
            </div>
        </div>
    );
}
