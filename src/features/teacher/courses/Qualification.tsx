import { useState } from 'react';

import QualificationCard from '@features/teacher/courses/QualificationCard.tsx';
import styles from '@pages/MyCoursePage.module.scss';

interface qualification {
    name: string;
    weight: string;
    rating: number;
}

interface QualificationProps {
    field: string;
    subheading: string;
}

export default function Qualification(props: QualificationProps) {
    const [qualifications, setQualifications] = useState<qualification[]>([
        {
            name: 'Test 1',
            weight: '20%',
            rating: 3.5,
        },
        {
            name: 'Test 2',
            weight: '20%',
            rating: 5.5,
        },
        {
            name: 'Test 3',
            weight: '60%',
            rating: 4.5,
        },
    ]);

    return (
        <div className={`${styles.proofOfQualification} ${styles.background}`}>
            <h3>{props.field}</h3>
            <p>{props.subheading}</p>
            <div className={styles.setWidth}>
                {qualifications.map((qualification, index) => {
                    return (
                        <QualificationCard
                            name={qualification.name}
                            weight={qualification.weight}
                            rating={qualification.rating}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}
