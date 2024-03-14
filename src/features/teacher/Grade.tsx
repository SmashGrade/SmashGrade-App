import { UserOutlined } from '@ant-design/icons';
import styles from '@pages/MyCoursePage.module.scss';
import { InputNumber } from 'antd';
import { useState } from 'react';

// TODO: Make these available globally
export type RatingType = 'good' | 'median' | 'bad' | 'none';

const RATING_CLASSNAMES: Record<RatingType, string> = {
    good: styles.ratingGood,
    median: styles.ratingMedian,
    bad: styles.ratingBad,
    none: styles.ratingNone,
};

const getRatingClass = (rating: number) => {
    switch (true) {
        case rating <= 0:
            return RATING_CLASSNAMES.none;
        case rating < 4:
            return RATING_CLASSNAMES.bad;
        case rating < 5:
            return RATING_CLASSNAMES.median;
        default:
            return RATING_CLASSNAMES.good;
    }
};

interface GradeProps {
    examId: number;
    evaluationId: number;
    studentId: number;
    studentName: string;
    field: string;
    rating: number;
}

export default function Grade(props: Readonly<GradeProps>) {
    const [ratingClass, setRatingClass] = useState(getRatingClass(props.rating));

    function handleOnChange(value: number | null) {
        setRatingClass(getRatingClass(value!));
    }

    return (
        <div className={`${styles.outlined} ${styles.gradeComponent}`}>
            <div className={styles.gradeComponent}>
                <UserOutlined />
                <div className={styles.componentChildren}>
                    <h3>{props.studentName}</h3>
                    <p>{props.field}</p>
                </div>
            </div>
            <InputNumber
                defaultValue={props.rating}
                min={1}
                max={6}
                step={0.01}
                className={ratingClass}
                onChange={handleOnChange}
            />
        </div>
    );
}
