import { UserOutlined } from '@ant-design/icons';
import styles from '@pages/MyCoursePage.module.scss';
import { InputNumber } from 'antd';
import { useCallback, useState } from 'react';
import { getRatingClass } from '@components/ui-elements/Rating';

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

    const handleOnChange = useCallback((value: number | null) => {
        setRatingClass(getRatingClass(value!));
    }, []);

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
